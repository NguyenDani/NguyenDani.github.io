document.getElementById('open-terminal').addEventListener('click', function() {
    var loadingScreen = document.getElementById('loadingScreen');
    var commandOutput = document.getElementById('commandOutput');
    
    var commands = [
        "Initializing system...",
        "Loading kernel modules...",
        "Checking file system integrity...",
        "Connecting to remote server...",
        "Connection established.",
        "Retrieving access credentials...",
        "Credentials obtained.",
        "Accessing mainframe...",
        "Decrypting security protocols...",
        "Security protocols bypassed.",
        "Scanning for vulnerabilities...",
        "Vulnerabilities detected.",
        "Exploiting vulnerabilities...",
        "Gaining elevated privileges...",
        "Privileges gained.",
        "Injecting remote access tools...",
        "Remote access tools injected.",
        "Collecting sensitive data...",
        "Data collection in progress...",
        "Downloading data...",
        "Data download complete.",
        "Uploading malicious payload...",
        "Payload upload complete.",
        "Executing payload...",
        "Payload execution successful.",
        "Compromising system...",
        "System compromise in progress...",
        "System compromise complete.",
        "Erasing tracks...",
        "Tracks erased.",
        "System compromised. Operation complete."
    ];
  
    loadingScreen.style.display = 'block';
    commandOutput.innerHTML = '';
  
    var commandIndex = 0;

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
  
    function displayNextCommand() {
      if (commandIndex < commands.length) {
        commandOutput.innerHTML += commands[commandIndex] + '\n';
        commandIndex++;
        setTimeout(displayNextCommand, getRandomInt(200));
      } else {
        setTimeout(function() {
          loadingScreen.style.display = 'none';
        }, 500);
      }
    }
  
    displayNextCommand();
});
  