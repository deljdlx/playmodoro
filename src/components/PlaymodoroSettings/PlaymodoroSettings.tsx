import React from 'react';
import { usePlaymodoroContext } from '../../contexts/playmodoro';
import { MEDIA_API_BASE_URL }  from '../../config';

export const PlaymodoroSettings: React.FC = () => {

    const {
        state,
        dispatchState,
    } = usePlaymodoroContext();
    const [mediaApiUrl, setMediaApiUrl] = React.useState<string>(state.mediaApiUrl);


    const handleMediaApiUrlChange = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatchState({
            type: "SET_MEDIA_API_URL",
            payload: e.currentTarget.querySelector('input')?.value || MEDIA_API_BASE_URL,
        });
    };


    return (
        <div className="playmodoro-cycles-settings">
            <div>

                {state.debugMode && (
                    <form onSubmit={(e) => handleMediaApiUrlChange(e)}>
                        <fieldset>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Medias api url</span>
                                </div>
                                <div className="flex gap-1">
                                    <input
                                        className="input input-bordered w-full grow"
                                        onClick={(e) => e.currentTarget.select()}
                                        onChange={(e) => setMediaApiUrl(e.target.value)}
                                        value={mediaApiUrl}
                                        placeholder={state.mediaApiUrl}
                                    />
                                    <button className="btn btn-primary btn-md" type="submit">OK</button>
                                </div>
                            </label>
                        </fieldset>
                    </form>
                )}


                <fieldset>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Cycles number</span>
                        </div>

                        <div className="flex gap-1">
                            <input
                                type="number"
                                min={1}
                                className="input input-bordered w-full grow"
                                placeholder="A number"
                                value={state.configuration.cycles}
                                onChange={(e) => dispatchState({
                                    type: "SET_CYCLES_NUMBER",
                                    payload: parseInt(e.target.value),
                                })}
                                onClick={(e) => e.currentTarget.select()}
                            />

                            <button className="btn btn-primary btn-md" type="submit">OK</button>
                        </div>

                    </label>

                </fieldset>

                <fieldset>


                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Work duration in minutes</span>
                        </div>
                        <div className="flex gap-1">
                            <input
                                type="number"
                                step="0.1"
                                min="0.1"
                                className="input input-bordered w-full grow"
                                placeholder={(state.configuration.workCycleDuration / 60000).toString()}
                                onBlur={(e) => {
                                    if (isNaN(parseFloat(e.target.value)) || parseFloat(e.target.value) <= 0) {
                                        e.target.value = state.configuration.workCycleDuration.toString();
                                        return;
                                    }

                                    dispatchState({
                                        type: "SET_WORK_CYCLE_DURATION",
                                        payload: parseFloat(e.target.value),
                                        // payload: parseInt(e.target.value),
                                    })
                                }}
                                onClick={(e) => e.currentTarget.select()}
                            />
                            <button className="btn btn-primary btn-md" type="submit">OK</button>
                        </div>
                    </label>
                </fieldset>

                <fieldset>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Pause duration in minutes</span>
                        </div>
                        <div className="flex gap-1">
                            <input
                                type="number"
                                step="0.1"
                                min="0.1"
                                className="input input-bordered w-full grow"
                                placeholder={(state.configuration.pauseCycleDuration / 60000).toString()}
                                onBlur={(e) => {
                                    if (isNaN(parseFloat(e.target.value)) || parseFloat(e.target.value) <= 0) {
                                        e.target.value = state.configuration.pauseCycleDuration.toString();
                                        return;
                                    }

                                    dispatchState({
                                        type: "SET_PAUSE_CYCLE_DURATION",
                                        payload: parseFloat(e.target.value),
                                        // payload: parseInt(e.target.value),
                                    })
                                }}
                                onClick={(e) => e.currentTarget.select()}
                            />
                            <button className="btn btn-primary btn-md" type="submit">OK</button>
                        </div>
                    </label>
                </fieldset>
            </div>


            <div className="debug_toggle_container mt-4">
                <label className="no_pause">
                    <span className="no_pause__caption">
                        Debug mode
                    </span>

                    <input
                        type="checkbox"
                        className="toggle"
                        checked={state.debugMode} onChange={() => dispatchState({
                            type: "TOGGLE_DEBUG_MODE",
                        })}
                    />
                </label>
            </div>

        </div>
    );

}