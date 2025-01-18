import React from 'react';

import { usePlaymodoroContext } from '../../contexts/playmodoro';
import { millisecondsToHuman } from '../../utils/string';

import {RiShutDownLine} from '@remixicon/react';

type PlaymodoroCyclesInformationsProps = {
    // cycles: number;
};

export const PlaymodoroCyclesInformations: React.FC<PlaymodoroCyclesInformationsProps> = ({
    // cycles
}) => {

    const {

        state,
        dispatchState,

        // cyclesCount,
        // totalTimeLeft,


    } = usePlaymodoroContext();

    return (
        <section className="cycles_informations">


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


            <div className="cycles__count item">
                <span>Cycles : </span>
                <span>{state.cyclesCount}/{state.configuration.cycles}</span>
            </div>

            <div className="item">
                <span>Total: </span>
                <span>{millisecondsToHuman(state.timeElapsed)}</span>
            </div>

            <div className="item">
                <span>Work: </span>
                <span>{millisecondsToHuman(state.configuration.workCycleDuration - state.workTimeElapsed)}</span>
            </div>
            <div className="item">
                <span>Pause: </span>
                <span>{millisecondsToHuman(state.configuration.pauseCycleDuration - state.pauseTimeElapsed)}</span>
            </div>
        </section>
    );

};