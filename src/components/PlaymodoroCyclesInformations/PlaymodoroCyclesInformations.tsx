import React from 'react';

import { usePlaymodoroContext } from '../../contexts/playmodoro';
import { millisecondsToHuman } from '../../utils/string';

import {RiHourglassLine} from '@remixicon/react';

type PlaymodoroCyclesInformationsProps = {

};

export const PlaymodoroCyclesInformations: React.FC<PlaymodoroCyclesInformationsProps> = ({

}) => {
    const {
        state,
    } = usePlaymodoroContext();

    return (
        <section className="cycles_informations">

            {state.debugMode && (
                <>
                    <div className="cycles__count item">
                        <span>Playlist : </span>
                        <span>{state.currentPlaylist}</span>
                    </div>

                    <div className="cycles__count item">
                        <span>Work data : </span>
                        <span>{state.currentWorkVideoIndex} : {millisecondsToHuman(state.currentWorkVideoElaspedTime)}</span>
                    </div>



                    <div className="cycles__count item">
                        <span>Pause data : </span>
                        <span>{state.currentPauseVideoIndex} : {millisecondsToHuman(state.currentPauseVideoElaspedTime)}</span>
                    </div>
                </>
            )}


            <div className="item">
                <span>Total elapsed: </span>
                <span>{millisecondsToHuman(state.timeElapsed)}</span>
            </div>

            <div className="cycles__count item">
                <span>Work cycles : </span>
                <span>{state.cyclesCount}/{state.configuration.cycles}</span>
            </div>

            {state.isWorkCycleRunning && (
                <div className="item">
                    <span>Work cycle ends in: </span>
                    <span>
                        {millisecondsToHuman(state.configuration.workCycleDuration - state.workTimeElapsed)}
                    </span>
                </div>
            )}

            {!state.isWorkCycleRunning && (
                <div className="item">
                    <span>Pause cycle ends in: </span>
                    <span>
                        {millisecondsToHuman(state.configuration.pauseCycleDuration - state.pauseTimeElapsed)}
                    </span>
                </div>
            )}
        </section>
    );

};