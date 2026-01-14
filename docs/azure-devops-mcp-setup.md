# Azure DevOps MCP Server Setup Guide

This guide explains how to connect VS Code Copilot to Azure DevOps so you can create and manage work items using AI.

---

## Prerequisites

- **VS Code** with GitHub Copilot extension
- **Node.js** installed (for `npx` command)
- **Azure DevOps** account with access to your team's organization

---

## Setup Steps

### 1. Create a Personal Access Token (PAT)

1. Go to [dev.azure.com](https://dev.azure.com)
2. Click your profile icon (top right) → **Personal access tokens**
3. Click **+ New Token**
4. Configure:
   - **Name:** `MCP-VSCode`
   - **Expiration:** 1 year (max)
   - **Scopes:** Full access (or select Work Items: Read & Write)
5. Click **Create** and **copy the token** (you won't see it again!)

### 2. Set Environment Variable

1. Press `Win + R`, type `sysdm.cpl`, press Enter
2. Go to **Advanced** tab → **Environment Variables**
3. Under **User variables**, click **New**:
   - **Variable name:** `AZURE_DEVOPS_PAT`
   - **Variable value:** *(paste your PAT)*
4. Click **OK** → **OK** → **OK**

### 3. Create MCP Config File

Create a file at `.vscode/mcp.json` in your repository:

```json
{
  "servers": {
    "azure-devops": {
      "command": "npx",
      "args": ["-y", "@azure-devops/mcp", "YOUR-ORG-NAME", "-a", "envvar"],
      "env": {
        "ADO_MCP_AUTH_TOKEN": "${env:AZURE_DEVOPS_PAT}"
      }
    }
  }
}
```

**Replace `YOUR-ORG-NAME`** with your Azure DevOps organization name.  
(Found in your URL: `https://dev.azure.com/YOUR-ORG-NAME`)

### 4. Create NPM Config File (Required for Deloitte)

If your npm is configured to use a private registry, create a `.npmrc` file in your repository root:

```
registry=https://registry.npmjs.org/
```

This ensures the MCP package is downloaded from the public npm registry without affecting other projects.

### 5. Restart VS Code

Environment variables are loaded when VS Code starts, so restart it to pick up the changes.

---

## Usage

1. Open **Copilot Chat** (`Ctrl + Alt + I`)
2. Switch to **Agent mode** (dropdown at top of chat)
3. Ask Copilot to interact with Azure DevOps:
   - "Create a user story for login functionality"
   - "List all work items assigned to me"
   - "Create a bug for the payment issue"

---

## Work Item Types

Your project's available work item types depend on the process template:

| Process | Work Item Types |
|---------|-----------------|
| **Basic** | Epic, Issue, Task |
| **Agile** | Epic, Feature, User Story, Task, Bug |
| **Scrum** | Epic, Feature, Product Backlog Item, Task, Bug |

---

## Troubleshooting

### MCP not connecting
- Check environment variable is set: `echo $env:AZURE_DEVOPS_PAT` in terminal
- Restart VS Code after setting environment variable
- Check MCP status: `Ctrl + Shift + P` → "MCP: List Servers"
- Make sure AGENT mode is chosen

### npm authentication error
- Ensure `.npmrc` file exists in your repo with `registry=https://registry.npmjs.org/`

### "Work item was not created"
- Check the project name matches exactly (including spaces)
- Check you're using a valid work item type for your process template

---

## Files to Commit

| File | Commit? | Contains Secrets? |
|------|---------|-------------------|
| `.vscode/mcp.json` | ✅ Yes | ❌ No |
| `.npmrc` | ✅ Yes | ❌ No |
| Environment variable | N/A | ✅ Yes (local only) |

---

## Security Notes

- **Never commit your PAT** to source control
- The PAT is stored as an environment variable on your machine only
- Each team member creates their own PAT
- PATs expire after 1 year - set a calendar reminder to renew

---

## How to run

Press Ctrl + Shift + P
Type "MCP: List Servers"
Click on azure-devops
Look for an option to enable tools