import React from 'react';
import { createRoot } from 'react-dom/client';
import { Dialog, dialog, Toast, toast } from '../index.js';

const App = () => {
    return (
        <>
            <Toast />
            <Dialog />

            <center>
            {/* Toast */}
            <h2>Toast</h2>
            { ['success', 'error', 'warn', 'info'].map(type => (
                <div key={type}>
                    <button onClick={() => toast[type](type)}>
                        { type } title
                    </button>
                    <button onClick={() => toast[type](type, `${type} `.repeat(3))}>
                        { type }
                    </button>
                    <button onClick={() => toast[type](type, 'this is a long text. This is a long text. This is a long text.')}>
                        { type } long
                    </button>
                </div>
            )) }


            {/* Dialog */}
            <h2>Dialog</h2>
            <button onClick={async () => {
                alert(await dialog.open({
                    title: 'Are you sure?',
                    messages: ['Do you want to delete it?'],
                }));
            }}>simple dialog</button>

            <button onClick={async () => {
                alert(await dialog.open({
                    title: 'Are you sure?',
                    messages: ['Do you want to delete it?'],
                    options: [
                        { title: 'Cancel' },
                        { title: 'Delete', value: 'delete' },
                    ],
                }));
            }}>dialog</button>

            <button onClick={async () => {
                alert(await dialog.open({
                    title: 'Which method?',
                    options: [
                        { title: 'GET', value: 'get', },
                        { title: 'POST', value: 'post', },
                        { title: 'DELETE', value: 'delete', },
                    ],
                }));
            }}>three options dialog</button>

            <button onClick={async () => {
                alert(await dialog.open({
                    title: 'Are you sure?',
                    messages: ['Do you want to add the item?'],
                    options: [
                        { title: 'Add', value: true, color: 'green' },
                        { title: 'Cancel', value: false, color: 'darkred' },
                    ],
                }));
            }}>custom colors dialog</button>

            </center>
        </>
    );
};

createRoot(document.getElementById('root')).render(<App />);