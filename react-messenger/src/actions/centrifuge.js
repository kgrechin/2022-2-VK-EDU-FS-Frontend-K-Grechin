import { Centrifuge } from 'centrifuge'

import {
  CENTRIFUGE_CONNECT_URL,
  CENTRIFUGE_URL,
  CENTRIFUGO_SUBSCRIBE_URL
} from '../constants/api'

import {
  CENTRIFUGE_CONNECT_FAILURE,
  CENTRIFUGE_CONNECT_SUCCESS,
  CENTRIFUGE_INITIAL_SUBSCRIBE,
  CHANNEL_SUBSCRIBE_FAILURE,
  CHANNEL_SUBSCRIBE_SUCCESS
} from '../constants/actionTypes'

const connectCentrifugeSuccess = (instance) => ({
  type: CENTRIFUGE_CONNECT_SUCCESS,
  payload: instance
})

const connectCentrifugeFailure = (message) => ({
  type: CENTRIFUGE_CONNECT_FAILURE,
  payload: message
})

export const connectCentrifuge = () => (dispatch, getState) => {
  const centrifuge = new Centrifuge(CENTRIFUGE_URL, {
    getToken: (ctx) =>
      new Promise((resolve, reject) =>
        fetch(CENTRIFUGE_CONNECT_URL, {
          body: JSON.stringify(ctx),
          method: 'POST',
          headers: {
            Authorization: `Bearer ${getState().auth.tokens.access_token}`,
            'Content-Type': 'application/json'
          }
        })
          .then((res) => res.json())
          .then((data) => resolve(data.token))
          .catch((err) => reject(err))
      )
  })
  centrifuge.connect()
  centrifuge.state === 'connecting'
    ? dispatch(connectCentrifugeSuccess(centrifuge))
    : dispatch(connectCentrifugeFailure(`Can't connect`))
}

const subscribeChannelSuccess = (channel) => ({
  type: CHANNEL_SUBSCRIBE_SUCCESS,
  payload: channel
})

const subscribeChannelFailure = (channel) => ({
  type: CHANNEL_SUBSCRIBE_FAILURE,
  payload: channel
})

export const subscribeChannel =
  (channel, onPublication) => (dispatch, getState) => {
    const centrifuge = getState().centrifuge.centrifuge
    const subscription = centrifuge.newSubscription(channel, {
      getToken: (ctx) =>
        new Promise((resolve, reject) =>
          fetch(CENTRIFUGO_SUBSCRIBE_URL, {
            body: JSON.stringify(ctx),
            method: 'POST',
            headers: {
              Authorization: `Bearer ${getState().auth.tokens.access_token}`,
              'Content-Type': 'application/json'
            }
          })
            .then((res) => res.json())
            .then((data) => resolve(data.token))
            .catch((err) => reject(err))
        )
    })
    subscription.subscribe()
    subscription.state === 'subscribing'
      ? dispatch(subscribeChannelSuccess(channel))
      : dispatch(subscribeChannelFailure(channel))
    subscription.on('publication', (ctx) => onPublication(ctx))
  }

export const setInitialSubscribe = () => (dispatch) =>
  dispatch({ type: CENTRIFUGE_INITIAL_SUBSCRIBE })
