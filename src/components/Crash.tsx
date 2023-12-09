import React from 'react';

type CrashProps = {
    status: string;
}

const Crash: React.FC<CrashProps> = ({ status }) => {

    const crashText = {
        errorResponse: {
            h1: 'Server response error',
            p: 'Unfortunately, we were unable to get the pits. Please try again later.'
        },
        errorSearsh: {
            h1: 'Nothing was found for your request',
            p: 'Please try another query.'
        }
    }

    return (
        <div className="content__crash">
            <h1>
                {
                    status === 'error' ? crashText.errorResponse.h1 : crashText.errorSearsh.h1
                }
                <span>😕</span></h1>
            <p>
                {
                    status === 'error' ? crashText.errorResponse.p : crashText.errorSearsh.p
                }
            </p>
        </div>
    )
}

export default Crash;