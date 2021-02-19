export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

export function receiveCategories(id) {
  return {
    type: RECEIVE_CATEGORIES,
    id
  }
}
