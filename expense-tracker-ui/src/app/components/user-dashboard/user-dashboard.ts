import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Expense } from '../../interfaces/Expense';
import { ExpenseService } from '../../services/expenses.service';
import { ConfirmationModalComponent } from '../../shared/confirmation-modal/confirmation-modal.component';
import { NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../services/toast-service';
import { ToastsContainer } from '../../shared/toasts-container/toasts-container';
import { CreateExpenseModalComponent } from '../../shared/input-modals/create-expense-modal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal';
import { UpdateExpenseModalComponent } from '../../shared/input-modals/update-expense-modal';
import { AuthService } from '../../services/auth.service';
import { AiService } from '../../services/ai.service';
import { CATEGORY_MAP, CATEGORY_NAMES } from '../constants/categories';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { WORD_TO_NUMBER_MAPPING } from '../constants/wordToNumberMapping';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-user-dashboard',
  imports: [ConfirmationModalComponent, NgbToast, ToastsContainer, NgbTooltip, DecimalPipe],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.scss'
})
export class UserDashboardComponent implements OnInit {
  constructor (
    private expenseService : ExpenseService,
    private toastService : ToastService,
    private authService : AuthService,
    private aiService: AiService,
    private modalService : NgbModal)
  {
  };

    expenses : Expense[] = [];
    expenseToDelete: Expense | null = null;
    expenseName: string = '';
    showDeleteModal: boolean = false;
    showToastMsg : boolean = false;
    userId! : number;
    isListening: boolean = false;
    
    private speechRecognition: any = null;
    private lastExpectedTranscript: string = '';

    @ViewChild('quickInput') quickInputElement!: ElementRef;
    
    ngOnInit() {
      this.userId = this.authService.getCurrentUserId();
      this.expenseService.getExpenses(this.userId).subscribe({
        next: (data) => this.expenses = data,
        error: (err) => console.error(err),
      });
      this.initialiseSpeechRecognition();
    }

    openDeleteModal(expense: Expense) {
      this.expenseToDelete = expense;
      this.showDeleteModal = true;
    }

    closeDeleteModal() {
      this.showDeleteModal = false;
      this.expenseToDelete = null;
    }

    deleteExpense(expenseId: number, successTemplate: TemplateRef<any>, failureTemplate: TemplateRef<any>) {
      this.expenseName = this.expenseToDelete?.name || '';
      this.expenseService.deleteExpense(expenseId).subscribe({
        next: () => {
          this.expenses = this.expenses.filter(expense => expense.id !== expenseId);
          this.closeDeleteModal();
          this.toastService.show({
            template: successTemplate,
            classname: 'bg-success text-light',
            delay: 5000,
          });
        },
        error: (err) => {
          console.error('Delete failed', err);
          this.toastService.show({
            template: failureTemplate,
            classname: 'bg-danger text-light',
            delay: 5000,
          });
      }});
    }

    createExpenseUsingModal(successTemplate: TemplateRef<any>, failureTemplate: TemplateRef<any>) {
      const modalRef = this.modalService.open(CreateExpenseModalComponent);

      modalRef.result.then((expense) => {
        this.expenseService.createExpense(expense).subscribe({
          next: (createdExpense) => {
            this.expenses.push(createdExpense);
            this.expenseName = createdExpense.name;
            this.toastService.show({
              template: successTemplate,
              classname: 'bg-success text-light'
            });
          },
          error: (err) => {
            console.error('Create expense failed', err);
            this.toastService.show({
              template: failureTemplate,
              classname: 'bg-danger text-light'
            });
          }
        });
      });
    }

    updateExpense(expense: Expense, successTemplate: TemplateRef<any>, failureTemplate: TemplateRef<any>) {
      const modalRef = this.modalService.open(UpdateExpenseModalComponent);

      modalRef.componentInstance.expense = {
        name: expense.name,
        amount: expense.amount,
        categoryId: expense.categoryId
      };

      modalRef.result.then((updatedExpense) => {
        this.expenseService.updateExpense(expense.id, updatedExpense).subscribe({
          next: (result) => {
            const index = this.expenses.findIndex(e => e.id === expense.id);
            this.expenses[index] = result;
            this.toastService.show({
              template: successTemplate,
              classname:'bg-success text-light'
            });
          },
          error: (err) => {
            console.error('Update expense failed', err);
            this.toastService.show({
              template: failureTemplate,
              classname:'bg-danger text-light'
            });
          }
        });
      });
    }

    createExpense() {
      if (this.isListening) {
        this.isListening = false;
        this.speechRecognition.stop();
      }
      const { expenseName, amountAsNumber } = this.parseUserInput();
      this.createExpenseFromQuickAdd(expenseName, amountAsNumber);
    }

    parseUserInput(): {expenseName: string, amountAsNumber: number} {
      const input = this.quickInputElement.nativeElement.value.trim();
      console.log('User Input:', input);
      const amountAsNumber = this.getAmount(input);
      const allTextExceptAmount = input.replace(/(\d+)\s*pounds?\s*(\d+)/, '')
                          .replace(/(\w+)\s*pounds?\s*(\w+)/, '')
                          .replace(/(\d+)\s*pounds?/, '')
                          .replace(/(\w+)\s*pounds?/, '')
                          .replace(/\d+\.?\d*/, '')
                          .replaceAll(/[£$€]/g, '')
                          .trim();
      const expenseName = this.getTextWithoutFillerWords(allTextExceptAmount);
      console.log('Parsed Name:', expenseName);
      return {expenseName, amountAsNumber};
    }

    // need to do: 20 pounds -> £20
    getAmount(input: string): number {
      const amountAsWordMatch0 = input.match(/(\d+)\s*pounds?\s*(\d+)/); // 2 pound 50
      const amountAsWordMatch1 = input.match(/(\w+)\s*pounds?\s*(\w+)/); // two pound fifty
      const amountAsWordMatch2 = input.match(/(\d+)\s*pounds?/); // 20 pounds
      const amountAsWordMatch3 = input.match(/(\w+)\s*pounds?/); // two pounds
      const amountAsNumberMatch = input.match(/\d+\.?\d*/); // 2.50 or 3

      if (amountAsWordMatch0) {
        const poundsAsNumber = parseFloat(amountAsWordMatch0[1]); // 2
        const penceAsNumber = parseFloat(amountAsWordMatch0[2]); // 50
        const amountAsNumber = poundsAsNumber + (penceAsNumber / 100); // 2.50
        console.log('Parsed Amount:', amountAsNumber);
        return amountAsNumber;
      }
      else if (amountAsWordMatch1 && amountAsWordMatch1[1] in WORD_TO_NUMBER_MAPPING && amountAsWordMatch1[2] in WORD_TO_NUMBER_MAPPING) { // two pound fifty
        const poundsAsWord = amountAsWordMatch1[1]; // two
        const penceAsWord = amountAsWordMatch1[2]; // fifty
        const poundsAsNumber = WORD_TO_NUMBER_MAPPING[poundsAsWord]; // 2
        const penceAsNumber = WORD_TO_NUMBER_MAPPING[penceAsWord]; // 50
        const amountAsNumber = poundsAsNumber + (penceAsNumber / 100); // 2.50
        console.log('Parsed Amount:', amountAsNumber);
        return amountAsNumber;
      }
      else if (amountAsWordMatch2) { // 20 pounds
        const poundsAsNumber = parseFloat(amountAsWordMatch2[1]); // 20
        console.log('Parsed Amount:', poundsAsNumber);
        return poundsAsNumber;
      }
      else if (amountAsWordMatch3) { // two pounds
        const numberAsWord = amountAsWordMatch3[1]; // two
        const amountAsNumber = numberAsWord ? WORD_TO_NUMBER_MAPPING[numberAsWord] : 0;
        console.log('Parsed Amount', amountAsNumber);
        return amountAsNumber;
      }
      else if (amountAsNumberMatch) { // 2.50 or 3
        const amountAsNumber = parseFloat(amountAsNumberMatch[0]);
        console.log('Parsed Amount:', amountAsNumber);
        return amountAsNumber;
      }
      else {
        console.log('no pattern match found for amount, defaulting to 0');
        return 0;
      }
    }

    getTextWithoutFillerWords(input: string): string {
      const listOfFillerWords: string[] = [
        // Action verbs
        'bought', 'purchased', 'paid', 'spent', 'got', 'ordered', 'had', 'went', 'grabbed', 'picked', 'took', 'used', 'needed', 'wanted',
        'getting', 'making', 'buying', 'seeing', 'eating', 'drinking', 'having', 'trying', 'stopping',
        // Mental/cognitive verbs
        'think', 'thought', 'believe', 'suppose', 'guess', 'feel', 'assume', 'reckon', 'figure', 'imagine', 'mean', 'meant', 'remember', 'forget',
        // Pronouns/articles
        'i', 'my', 'me', 'the', 'a', 'an', 'some', 'this', 'that', 'these', 'those', 'we', 'us', 'our', 'your', 'you', 'he', 'she', 'they', 'them', 'their', 'his', 'her', 'it', 'its',
        // Contractions
        "i'm", "i'll", "i've", "i'd", "you're", "you'll", "you've", "you'd", "he's", "she's", "it's", "we're", "we've", "we'll", "we'd", "they're", "they've", "they'll", "they'd",
        "that's", "there's", "here's", "what's", "who's", "where's", "when's", "why's", "how's", "ain't", "aren't", "wasn't", "weren't",
        "haven't", "hasn't", "hadn't", "don't", "doesn't", "didn't", "won't", "wouldn't", "shouldn't", "couldn't", "can't", "mustn't", "mightn't", "shan't",
        "let", "lets", "lemme", "gotta", "gonna", "wanna", "kinda", "sorta", "outta", "dunno", "betcha", "gimme", "c'mon", "y'all",
        // Prepositions
        'for', 'at', 'on', 'to', 'from', 'in', 'with', 'of', 'and', 'or', 'but', 'then', 'also', 'plus', 'near', 'next', 'under', 'over', 'through', 'across', 'between', 'among', 'along',
        // Conjunctions
        'nor', 'yet', 'because', 'since', 'unless', 'until', 'although', 'though', 'if', 'whether',
        // Time words
        'today', 'yesterday', 'earlier', 'later', 'morning', 'afternoon', 'before', 'after', 'when', 'while', 'now', 'soon', 'recently', 'currently', 'right', 'evening', 'night', 'week', 'month',
        // Approximations
        'about', 'around', 'roughly', 'approximately', 'like',
        // Noise
        'um', 'uh', 'er', 'ah', 'well', 'so', 'just', 'really', 'kind', 'sort', 'know', 'yeah', 'yes', 'no', 'okay', 'ok', 'sure',
        'anyway', 'anyways', 'anyhow', 'besides', 'however', 'nonetheless', 'nevertheless', 'otherwise', 'therefore', 'thus', 'hence', 'meanwhile', 'furthermore', 'moreover',
        // Auxiliary verbs
        'is', 'was', 'were', 'are', 'am', 'be', 'been', 'being', 'have', 'has', 'do', 'does', 'did', 'get', 'gets', 'getting',
        // Modal verbs
        'will', 'would', 'should', 'could', 'can', 'may', 'might', 'must', 'shall',
        // Location words
        'shop', 'shops', 'store', 'stores', 'supermarket', 'mall', 'place', 'market', 'restaurant', 'cafe', 'outlet', 'counter', 'stand', 'stall', 'vendor', 'bar', 'pub', 'deli', 'bakery', 'butcher',
        // Quantifiers/Determiners
        'much', 'more', 'less', 'little', 'lot', 'lots', 'bit', 'any', 'every', 'each', 'either', 'neither', 'both', 'all', 'several', 'few', 'many',
        // Adverbs
        'very', 'quite', 'pretty', 'rather', 'too', 'enough', 'only', 'even', 'almost', 'nearly', 'barely', 'hardly', 'actually', 'basically',
        // Common adjectives
        'new', 'old', 'nice', 'good', 'cheap', 'expensive', 'big', 'small', 'large', 'tiny', 'huge',
        // Vague words
        'thing', 'stuff', 'something', 'anything', 'nothing', 'everything', 'someone', 'anyone', 'everyone'
      ];
      const words = input.toLowerCase().split(/\s+/);
      const filteredWords: string[] = [];
      for (var word of words) {
        if (!listOfFillerWords.includes(word)) {
          filteredWords.push(word);
        }
      }
      return filteredWords.join(' ').trim();
    }

    createExpenseFromQuickAdd(expenseName: string, amount: number) {
      console.log('Inside createExpenseFromQuickAdd method');

      const expense: Expense = {
        name: expenseName,
        amount: amount,
        categoryId: 19,
        userId: this.userId,
      } as Expense;

      this.expenseService.createExpense(expense).subscribe({
        next: (createdExpense) => {
          createdExpense.categoryName = 'Thinking...';
          createdExpense.categoryIcon = '🤔';
          this.expenses.push(createdExpense);
          this.expenseName = createdExpense.name;
          this.quickInputElement.nativeElement.value = '';

          this.aiService.getSugggestedCategory(expenseName, CATEGORY_NAMES)
            .subscribe({
              next: (response) => {
                const categoryName = response.suggestedCategory || 'Other';
                const categoryId = CATEGORY_MAP[categoryName as keyof typeof CATEGORY_MAP];
                console.log(`AI Suggested Category: ${categoryName} with confidence ${response.confidence}`);
                
                this.expenseService.updateExpense(createdExpense.id, {...expense, categoryId}).subscribe({
                  next: (result) => {
                    const index = this.expenses.findIndex(e => e.id === createdExpense.id);
                    if (index !== -1) {
                      this.expenses[index] = result;
                    }
                    
                  },
                  error: (err) => {
                    console.error('Update expense failed', err);
                  }
                });
              },
              error: (err) => {
                console.error(`Error suggesting category: ${err}`);
              }
          });
        },
        error: (err) => {
          console.error('Create expense failed', err);
          
        }
      });

      
    }

    toggleVoiceInput() {
      if (!this.speechRecognition) { // probably not supported in this browser (limited support on firefox for example)
        return;
      }
      if (this.isListening) {
        this.speechRecognition.stop();
      }
      else { // need to start listening now
        this.lastExpectedTranscript = '';
        this.speechRecognition.start();
      }
    }

    private initialiseSpeechRecognition(): void {
      const speechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!speechRecognitionAPI) {
        return;
      }
      this.speechRecognition = new speechRecognitionAPI();
      this.speechRecognition.continuous = true; // user needs to stop it manually. Silence does NOT stop it.
      this.speechRecognition.interimResults = true; // needed for real-time text display as user speaks.
      this.speechRecognition.lang = 'en-GB';

      this.speechRecognition.onresult = (event: any) => {
        let fullTranscript = '';

        for (let i = 0; i < event.results.length; i++) {
          fullTranscript += event.results[i][0].transcript;
        }

        if (this.quickInputElement.nativeElement.value.trim() !== this.lastExpectedTranscript.trim()) {
          console.log('User manually made changes');
          const newlySpoken = fullTranscript.slice(this.lastExpectedTranscript.length); // this is the key line which allows manual changes.
          this.quickInputElement.nativeElement.value = this.quickInputElement.nativeElement.value.trim() + newlySpoken;
        } else {
          this.quickInputElement.nativeElement.value = fullTranscript.trim();
        }

        this.lastExpectedTranscript = fullTranscript.trim();
      }

      this.speechRecognition.onerror = () => {
        this.isListening = false;
      }

      this.speechRecognition.onend = () => {
        this.isListening = false;
      }

      this.speechRecognition.onstart = () => {
        this.isListening = true;
      }
    }
  }
