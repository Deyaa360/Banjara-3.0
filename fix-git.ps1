# Script to fix Git directory locking issues on Windows/OneDrive

# Disable auto garbage collection during commits
git config --local gc.auto 0

# Disable prompts for directory deletion
git config --local core.askPass ""

# Configure Git to avoid unnecessary file locks
git config --local core.preloadindex true
git config --local core.fscache true

# Move your repository out of OneDrive
Write-Host "To permanently fix this issue, consider moving your Git repository out of OneDrive." -ForegroundColor Yellow
Write-Host "OneDrive's file syncing can conflict with Git's internal file operations." -ForegroundColor Yellow
Write-Host ""
Write-Host "Recommended solution:" -ForegroundColor Green
Write-Host "1. Create a folder outside OneDrive (e.g., C:\Projects\)" -ForegroundColor Green
Write-Host "2. Move your repository there" -ForegroundColor Green
Write-Host "3. Use OneDrive for backups instead of active development" -ForegroundColor Green

Write-Host ""
Write-Host "Git has been configured to minimize these issues, but they may still occur occasionally." -ForegroundColor Cyan
Write-Host "When they do, just press 'n' until the operation completes." -ForegroundColor Cyan