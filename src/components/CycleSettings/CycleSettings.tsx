import React from 'react';
import { usePlaymodoroContext } from '../../contexts/playmodoro';

export const CycleSettings: React.FC = () => {

    const {
        state,
        dispatchState,
    } = usePlaymodoroContext();


    return (
        <div className="playmodoro_panel cycle_settings_panel">
            <div className="playmodoro-cycles-settings">
                <div>
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

                    {/* <button className="btn btn-primary btn-md" type="submit">Add</button> */}
                </div>
            </div>
        </div>
    );

}