import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, TextField, Paper, Button } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';



const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(4),
    },
    searchBox: {
        '& .gsc-input': {
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '16px',
        },
    },
    summaryBox: {
        marginBottom: theme.spacing(4),
        padding: theme.spacing(2),
    },
    chatContainer: {
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2),
        maxHeight: 400,
        overflowY: 'auto',
    },
    textWhite: {
        color: 'white',
    },
    transcriptionBox: {
        width: "100%",
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(2),
    },
}));

const DoubtSection = () => {
    const classes = useStyles();
    const [summary, setSummary] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    //   const [isRecording, setIsRecording] = useState(false);
    const { transcript, resetTranscript } = useSpeechRecognition();
    const [generatedTranscript, setGeneratedTranscript] = useState("");



    const handleUserMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Handle user message change
    };

    const startListening = () => {
        setIsRecording(true);
        SpeechRecognition.startListening({ continuous: true });
    };
    const stopListening = () => {
        setIsRecording(false);
        SpeechRecognition.stopListening();
    };
    const handleSendMessage = () => {
        // Handle sending the userMessage as needed
    };

    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        // Handle the selected file as needed
        console.log('Selected file:', selectedFile);
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cse.google.com/cse.js?cx=c3b8fb30093cc48c3';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleSearch = () => {
        const searchBox = document.querySelector('.gsc-input') as HTMLInputElement;
        if (searchBox) {
            // Do something with the search query
            console.log('Search query:', searchBox.value);
        }
        const searchButton = document.querySelector('.gsc-search-button') as HTMLButtonElement;
        if (searchButton) {
            searchButton.click();
        }
    };

    return (
        <Container className={classes.container}>
            <Helmet>
                <script async src="https://cse.google.com/cse.js?cx=c3b8fb30093cc48c3"></script>
            </Helmet>
            <Paper className={classes.summaryBox}>
                <Typography variant="h6" gutterBottom>
                    Summary/Notes
                </Typography>
                <TextField
                    multiline
                    rows={4}
                    fullWidth
                    variant="outlined"
                    value={summary}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </Paper>

            <div className="gcse-search"></div> <br />
            <Typography variant="h6" className={classes.textWhite} gutterBottom>
                Send your doubts through Pixels and Sound
            </Typography>
            <div className="flex">
                <input
                    type="file"
                    className={classes.textWhite}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
                <img
                    src="https://img.icons8.com/external-outline-berkahicon/64/external-File-files-and-folders-outline-berkahicon-3.png"
                    alt="Upload Image"
                    height="70px"
                    width="70px"
                    className={classes.textWhite}
                    style={{
                        cursor: 'pointer',
                        borderRadius: '2%',
                        background: 'white',
                        height: '100px',
                        width: '100px',
                        paddingBottom: '2px',
                    }}
                    onClick={handleImageClick}
                />
            </div>
            <Button
                // variant="contained"
                color="primary"
                onClick={isRecording ? stopListening : startListening}
                style={{ display: 'flex', alignItems: 'center' }}
            >
                <img
                    src='https://png2.cleanpng.com/sh/025c9f0b51d322dcb93e24489b07e510/L0KzQoK3VcExN5DnipH9cnHxg8HokvVvfF53fdV4cnTogn70ifNzd6Fth9DuLXnmf7A0jgV0cZQygdV4bj35ebXsj71qa5DzRag5OUnlRIfrWfRnPZI7RqoDMEW6QIeAUcYzOGc9Tas8M0a3R3B3jvc=/transparent-recorder-microphone-icon-music-icon-video-icon-6099b46d9df5a6.880570671620685933647.png'
                    alt="Mic Icon"
                    style={{
                        position: 'absolute',
                        // marginRight: '0px', // Adjust spacing as needed
                        right: '-1130px',
                        top: '35px',
                        width: '50px',     // Adjust size as needed
                        height: '100px',
                        zIndex: '2'
                    }}
                />

            </Button>
            <TextField
                label="Live Transcription"
                variant="outlined"
                className={classes.transcriptionBox}
                multiline
                rows={4}
                value={generatedTranscript || transcript}
                placeholder="Transcription will appear here..."
                style={{
                    // border: '1px solid white',
                    // color: "white",
                    // background: 'lightblue',
                }}
                InputProps={{

                    readOnly: true,
                    style: { color: 'black' },
                }}
            />
        </Container>
    );
};

// export default DoubtSection;
// 

// export default DoubtSection;


{/* <Paper style={{ height: '300px' }} className={classes.chatContainer}>
                {chatHistory.map((message, index) => (
                    <Typography
                        key={index}
                        style={{ color: 'white', overflowY: 'scroll' }}
                        variant="body1"
                        className={message.role === 'user' ? classes.userMessage : classes.assistantMessage}
                    >
                        {message.content}
                        <br />
                        <br />
                        <hr />
                        <br />
                        <p className='h-10'>
                            hello
                        </p>
                    </Typography>
                ))}
            </Paper> */}


{/* <TextField
                fullWidth
                variant="outlined"
                placeholder="Type your doubt/question here..."
                value={userMessage}
                inputProps={{
                    style: {
                        color: 'white'
                    }
                }}
                onChange={handleUserMessageChange}
            /> */}
{/* <Button variant="contained" color="primary" onClick={handleSendMessage} style={{ marginTop: 8 }}>
                Send
            </Button> */}
export default DoubtSection;


