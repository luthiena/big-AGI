import * as React from 'react';

import { Box, Button, ButtonGroup, FormControl, Typography } from '@mui/joy';

import { FormLabelStart } from '~/common/components/forms/FormLabelStart';
import { animationEnterBelow } from '~/common/util/animUtils';


export function BeamHeader(props: {
  isMobile: boolean,
  llmComponent: React.ReactNode,
  rayCount: number,
  setRayCount: (n: number) => void,
  startEnabled: boolean,
  startBusy: boolean
  onStart: () => void,
}) {

  return (
    <Box
      // variant='outlined'
      sx={{
        // style
        // borderRadius: 'md',
        // backgroundColor: 'background.popup',
        backgroundColor: 'background.surface',
        boxShadow: 'md',
        p: 'var(--Pad)',
        zIndex: 1, // stay on top of the user message, for shadow to cast on it

        // layout: max 2 cols (/3 with gap) of min 200px per col
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(max(200px, 100%/4), 1fr))',
        gridAutoFlow: 'row dense',
        gap: 'var(--Pad_2)',

        // '& > *': { border: '1px solid red' },
      }}
    >

      {/* Title */}
      <Box sx={{ display: 'flex', gap: 'var(--Pad_2)', my: 'auto' }}>
        {/*<Typography level='h4'>*/}
        {/*  <ChatBeamIcon sx={{ animation: `${animationColorDarkerRainbow} 2s linear 2.66` }} />*/}
        {/*</Typography>*/}
        <div>
          <Typography level='h4' component='h2'>
            {/*big-AGI · */}
            Beam
          </Typography>

          <Typography level='body-sm'>
            Combine the smarts of models
          </Typography>
        </div>
      </Box>

      {/* LLM cell */}
      <Box sx={{ display: 'flex', gap: 'calc(var(--Pad) / 2)', alignItems: 'center', justifyContent: props.isMobile ? undefined : 'center' }}>
        {props.llmComponent}
      </Box>

      {/* Count and Start cell */}
      <FormControl sx={{ flex: 1, display: 'flex', justifyContent: 'space-between' /* gridColumn: '1 / -1' */ }}>
        {!props.isMobile && <FormLabelStart title='Beam Count' />}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* xN buttons */}
          <ButtonGroup variant='outlined' sx={{ flex: 1, display: 'flex', '& > *': { flex: 1 } }}>
            {[2, 4, 8].map((n) => {
              const isActive = n === props.rayCount;
              return (
                <Button
                  key={n}
                  // variant={isActive ? 'solid' : undefined}
                  color='neutral'
                  onClick={() => props.setRayCount(n)}
                  sx={{
                    fontWeight: isActive ? 'xl' : 400, /* reset, from 600 */
                    backgroundColor: isActive ? 'background.popup' : undefined,
                    maxWidth: '3rem',
                  }}
                >
                  {`x${n}`}
                </Button>
              );
            })}
          </ButtonGroup>

          {/* Start ... */}
          <Button
            variant='solid'
            color='success'
            disabled={!props.startEnabled || props.startBusy}
            loading={props.startBusy}
            onClick={props.onStart}
            // endDecorator={<ChatBeamIcon />}
            sx={{ ml: 'auto', minWidth: 80 }}
          >
            Start
          </Button>
        </Box>
      </FormControl>

    </Box>
  );
}