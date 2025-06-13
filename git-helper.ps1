# This script automates saying "no" to Git garbage collection prompts
# Usage: ./git-helper.ps1 "git commit -m 'Your commit message'"

param(
    [Parameter(Mandatory=$true)]
    [string]$GitCommand
)

# Configure Git to avoid the prompts in the first place
git config --local core.askPass ""
git config --local gc.autoDetach false

# Function to execute the git command and automatically respond "n" to prompts
function Execute-GitCommand {
    $process = Start-Process -FilePath "git" -ArgumentList $GitCommand.Substring(4) -NoNewWindow -RedirectStandardInput -RedirectStandardOutput -RedirectStandardError -PassThru

    # Keep saying "n" to all prompts
    while (!$process.HasExited) {
        Start-Sleep -Seconds 1
        $process.StandardInput.WriteLine("n")
    }

    # Output the results
    $output = $process.StandardOutput.ReadToEnd()
    $error = $process.StandardError.ReadToEnd()
    
    Write-Host $output
    if ($error) {
        Write-Host "Error: $error" -ForegroundColor Red
    }
}

# Execute the command
Execute-GitCommand