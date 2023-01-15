export const UNITS = Object.freeze({
  KG: 'kg',
  LB: 'lb',
  PIECE: 'piece',
  CUP: 'cup',
  LITRE: 'litre',
})

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'
