import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, TextField, Button, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(4),
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
    userMessage: {
        backgroundColor: theme.palette.primary.light,
        padding: theme.spacing(1),
        borderRadius: 4,
        marginBottom: theme.spacing(1),
    },
    assistantMessage: {
        backgroundColor: theme.palette.grey[200],
        padding: theme.spacing(1),
        borderRadius: 4,
        marginBottom: theme.spacing(1),
    },
}));

const DoubtSection = () => {
    const classes = useStyles();
    const [summary, setSummary] = useState('');
    const [userMessage, setUserMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([]);
    // const { default: MonsterApiClient } = require("monsterapi");
    // const client = new MonsterApiClient('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImVmMmVkMzU3NWYyZjgxNjkyZGZhNTIyOGY2NmM0OTc1IiwiY3JlYXRlZF9hdCI6IjIwMjMtMTEtMjFUMDg6MTU6MDkuNTA4ODQ3In0.7q6dFIFPsxRWnSEk9eZuo9HQxpmXGyvoWNKuu9_1f5Q');
    // const model = 'llama2-7b-chat';

    //     useEffect(() => {
    //         // Read the transcript file
    //         fetch('/transcriptions.txt')
    //             .then(response => response.text())
    //             .then(transcript => {
    //                 const input = {
    //                     prompt: Summarize the following transcript: \n\n${ transcript },
    //                     max_length: 1000,
    //                     system_prompt: 'You are a helpful assistant that summarizes transcripts.'
    //             };

    //         // Generate summary using Monster API
    //         client.generate(model, input)
    //             .then((response: any) => {
    //                 if (response && response.data && response.data.choices && response.data.choices.length > 0) {
    //                     const generatedSummary = response.data.choices[0].text;
    //                     const plainTextSummary = generatedSummary.replace(/<[^>]+>/g, '');
    //                     console.log('Generated summary:', plainTextSummary);
    //                     setSummary(plainTextSummary);
    //                 } else {
    //                     console.error('Invalid response format from Monster API');
    //                 }
    //             })
    //             .catch((error: string) => {
    //                 console.error('Error:', error);
    //             });
    //     });
    // }, []);

    const handleUserMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserMessage(event.target.value);
    };

    const handleSendMessage = async () => {
        if (userMessage.trim() !== '') {
            const updatedChatHistory = [...chatHistory, { role: 'user', content: userMessage }];
            setChatHistory(updatedChatHistory);
            setUserMessage('');

            try {
                const response = await fetch('https://api.zephyrnet.com/v1/engines/zephyr-playground/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer YOUR_API_KEY',
                    },
                    body: JSON.stringify({
                        messages: updatedChatHistory,
                        max_tokens: 100,
                        n: 1,
                        stop: null,
                        temperature: 0.7,
                    }),
                });

                const data = await response.json();
                const assistantMessage = data.choices[0].message.content;
                setChatHistory([...updatedChatHistory, { role: 'assistant', content: assistantMessage }]);
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <Container className={classes.container}>
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
            <Typography variant="h6" className=' text-white' gutterBottom>
                Doubt Solver Chat
            </Typography>
            <Paper style={{ height: '300px' }} className={classes.chatContainer}>
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
            </Paper>
            <TextField
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
            />
            <Button variant="contained" color="primary" onClick={handleSendMessage} style={{ marginTop: 8 }}>
                Send
            </Button>
        </Container>
    );
};

export default DoubtSection;