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

@Component({
  selector: 'app-user-dashboard',
  imports: [ConfirmationModalComponent, NgbToast, ToastsContainer, NgbTooltip],
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
    textThatsAlreadyThere: string = '';

    private speechRecognition: any = null;

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

    createExpense(successTemplate: TemplateRef<any>, failureTemplate: TemplateRef<any>) {
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

    parseUserInput(event: any) {
      const input = event.target.value.trim();
      const amountMatch = input.match(/\d+\.?\d*/);
      const amountAsNumber = amountMatch ? parseFloat(amountMatch[0]) : 0;
      console.log('Parsed Amount:', amountAsNumber);
      const expenseName = input.replace(/\d+\.?\d*/, '')
                          .replaceAll(/[£$€]/g, '')
                          .trim();
      console.log('Parsed Name:', expenseName);
      this.createExpenseFromQuickAdd(expenseName, amountAsNumber);
    }

    createExpenseFromQuickAdd(expenseName: string, amount: number) {
      this.aiService.getSugggestedCategory(expenseName, CATEGORY_NAMES)
        .subscribe({
          next: (response) => {
            const categoryName = response.suggestedCategory || 'Other';
            const categoryId = CATEGORY_MAP[categoryName as keyof typeof CATEGORY_MAP];
            console.log(`AI Suggested Category: ${categoryName} with confidence ${response.confidence}`);

            const expense: Expense = {
              name: expenseName,
              amount: amount,
              categoryId: categoryId,
              userId: this.userId,
            } as Expense;

            this.expenseService.createExpense(expense).subscribe({
              next: (createdExpense) => {
                this.expenses.push(createdExpense);
                this.expenseName = createdExpense.name;
                this.quickInputElement.nativeElement.value = '';
              },
              error: (err) => {
                console.error('Create expense failed', err);
                
              }
            });

          },
          error: (err) => {
            console.error(`Error suggesting category: ${err}`);
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
        this.textThatsAlreadyThere = this.quickInputElement.nativeElement.value;
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
        let currentResult = '';
        let lastSpokenPart = '';
        if(this.textThatsAlreadyThere != '') {
          currentResult = this.textThatsAlreadyThere + ' ';
        }
        for (let i = 0; i < event.results.length; i++) { // loop through everything spoken so far and add to full transcript. 
          currentResult += event.results[i][0].transcript + ' ';
          
        }
        lastSpokenPart = event.results[event.results.length - 1][0].transcript;
        
        

        if (currentResult != this.quickInputElement.nativeElement.value) {
          currentResult = lastSpokenPart;
          fullTranscript = this.quickInputElement.nativeElement.value + ' ' + currentResult;
        }
        else {
          fullTranscript = currentResult;
        }

        // if theres already text present, prepend this written text to the spoken text
        // if user corrects any text, that means the expected value differs to the content
        // of the text box, so we need to only add the new text (so that way we keep the users changes)


        let result = fullTranscript.trim();
        if(this.quickInputElement.nativeElement.value != result) {
          // add the differing text to result
        }

        this.quickInputElement.nativeElement.value = result; // display real-time transcript
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
