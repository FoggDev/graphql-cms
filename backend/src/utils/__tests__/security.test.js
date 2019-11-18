import {
  encrypt,
  getBase64,
  setBase64
} from '../security'

describe('#encrypt', () => {
  it('should return a encrypted salted string', () => {
    expect(encrypt('foo')).toBe('e39d1cbc9d72392729986185e3cdfb2160f55b1b')
  })
})

describe('#getBase64', () => {
  it('should get a value from base64 string', () => {
    expect(getBase64('Zm9v')).toBe('foo')
  })

  it('should get a JSON from base64 string', () => {
    expect(getBase64('eyJmb28iOiJiYXIifQ==')).toEqual({ foo: 'bar' })
  })
})

describe('#setBase64', () => {
  it('should set a string value to base64 string', () => {
    expect(setBase64('foo')).toBe('Zm9v')
  })

  it('should set a JSON to base64 string', () => {
    expect(setBase64(JSON.stringify({ foo: 'bar' }))).toEqual('eyJmb28iOiJiYXIifQ==')
  })
})
