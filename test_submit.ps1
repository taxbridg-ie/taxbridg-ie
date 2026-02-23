$url = 'https://forms.zohopublic.eu/infotaxa1/form/leadformwebsite/formperma/zXMKA2XCuiSvQN3yHRuMRdCFarznyuzBf95baI1E3-c/htmlRecords/submit'
$data = @{
    'Name_First'='Test';
    'Name_Last'='User';
    'Email'='test@example.com';
    'PhoneNumber_countrycode'='1234567890';
    'Dropdown'='FORM 12';
}
try {
    $response = Invoke-RestMethod -Uri $url -Method Post -Body $data -ErrorAction Stop
    Write-Output "Success"
} catch {
    Write-Output "Error: $_"
}
