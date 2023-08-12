import MessageDisplay from '@/components/MessageDisplay'
import { mount } from '@vue/test-utils'
import { getMessage } from '../../src/services/axios'
import flushPromises from 'flush-promises'

jest.mock('@/services/axios')

describe('MessageDisplay', () => {
  it('Calls getMessage and displays message', async () => {
    const mockMessage = 'Hello from the db!'
    getMessage.mockResolvedValueOnce({ text: mockMessage })
    const wrapper = mount(MessageDisplay)

    await flushPromises()
    expect(getMessage).toHaveBeenCalledTimes(1)
    const message = wrapper.find('[data-testid="message"]').element.textContent
    expect(message).toEqual(mockMessage)
  })

  it('Displays an error when getMessage call fails', async () => {
     // mock the failed API call
     const wrapper = mount(MessageDisplay)
     // wait for promise to resolve
     // check that call happened once
     // check that component displays error
  })
})