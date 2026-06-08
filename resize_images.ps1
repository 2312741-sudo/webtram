Add-Type -AssemblyName System.Drawing

$files = Get-ChildItem -Path d:\webtram\hinhsp\*.png, d:\webtram\hinhsp\*.jpg

foreach ($file in $files) {
    if ($file.Length -lt 300000) { continue }

    try {
        $img = [System.Drawing.Image]::FromFile($file.FullName)
        
        $maxDimension = 500
        if ($img.Width -le $maxDimension -and $img.Height -le $maxDimension) {
            $img.Dispose()
            continue
        }

        $ratio = $img.Width / $img.Height
        if ($ratio -gt 1) {
            $newW = $maxDimension
            $newH = [int][math]::Round($maxDimension / $ratio)
        } else {
            $newH = $maxDimension
            $newW = [int][math]::Round($maxDimension * $ratio)
        }

        $newImg = New-Object System.Drawing.Bitmap($newW, $newH)
        $graph = [System.Drawing.Graphics]::FromImage($newImg)
        $graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graph.DrawImage($img, 0, 0, $newW, $newH)
        $graph.Dispose()
        $img.Dispose()

        $tempPath = $file.FullName + ".tmp.png"
        $newImg.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)
        $newImg.Dispose()

        Remove-Item -Force $file.FullName
        Rename-Item -Path $tempPath -NewName $file.Name
        
        Write-Host "Resized $($file.Name) to $($newW)x$($newH)"
    } catch {
        Write-Host "Error processing $($file.Name): $($_.Exception.Message)"
    }
}
