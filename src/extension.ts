// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
var getUserMedia = require('get-user-media-promise');
var MicrophoneStream = require('microphone-stream');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	var micStream = new MicrophoneStream();

	console.log('Congratulations, your extension "voice-sc" is now active!');
	let turnOnStream = vscode.commands.registerCommand('voice-sc.turnOnStream', () => {
		vscode.window.showInformationMessage('Microphone stream is on...');


		getUserMedia({ video: false, audio: true })
			.then(function(stream: any) {
				micStream.setStream(stream);
			}).catch(function(error: any) {
				console.log(error);
			});

		// get Buffers (Essentially a Uint8Array DataView of the same Float32 values)
		micStream.on('data', function(chunk: any) {
    // Optionally convert the Buffer back into a Float32Array
    // (This actually just creates a new DataView - the underlying audio data is not copied or modified.)
    var raw = MicrophoneStream.toRaw(chunk);
    //...

    // note: if you set options.objectMode=true, the `data` event will output AudioBuffers instead of Buffers
   });

  // or pipe it to another stream
  micStream.pipe(/*...*/);

  // Access the internal audioInput for connecting to another nodes
  micStream.audioInput.connect(/*...*/);
	});

	let turnOffStream = vscode.commands.registerCommand('voice-sc.turnOffStream', () => {
		vscode.window.showInformationMessage('Microphone stream is off...');
		micStream.pauseRecording();
	});

	// Push Commands
	context.subscriptions.push(turnOnStream);
	context.subscriptions.push(turnOffStream);
}

// this method is called when your extension is deactivated
export function deactivate() {}
