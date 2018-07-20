import * as types from './types'

export function setExampleData(data) {
    return {
        type: types.SET_EXAMPLE_DATA,
        data
    }
}