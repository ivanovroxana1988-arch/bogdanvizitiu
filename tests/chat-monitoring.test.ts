import test from 'node:test'
import assert from 'node:assert/strict'
import {
  classifyChatQuestion,
  measurementAllowed,
  validMeasurementId,
} from '../lib/chat-monitoring'
test('classifies Romanian and English without exposing free text or personal details', () => {
  assert.deepEqual(classifyChatQuestion('Cât costă coachingul? Eu sunt Maria, maria@example.com'), {
    topics: ['coaching'],
    intents: ['price'],
  })
  assert.deepEqual(classifyChatQuestion('Sales Lab price and where?'), {
    topics: ['sales'],
    intents: ['price', 'venue'],
  })
  assert.deepEqual(classifyChatQuestion('maria@example.com 0722222222'), {
    topics: ['other'],
    intents: ['other'],
  })
})
test('old AI consent never implies measurement consent', () => {
  assert.equal(measurementAllowed({ aiConsent: true }), false)
  assert.equal(measurementAllowed({ analyticsConsent: true, analyticsConsentVersion: 0 }), false)
  assert.equal(measurementAllowed({ analyticsConsent: true, analyticsConsentVersion: 1 }), true)
  assert.equal(validMeasurementId('personal@email.com'), false)
  assert.equal(validMeasurementId('e0a33ced-772d-49b0-a299-cddfb2aed493'), true)
})
