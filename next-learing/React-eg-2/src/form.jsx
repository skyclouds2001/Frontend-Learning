import { useState } from 'react'

export default function Form () {
  const [ form, updateForm ] = useState({
    text: '',
    check: false
  })

  const handleForm = e => {
    updateForm({
      text: e.target.name === 'text' ? e.target.value : form.text,
      check: e.target.name === 'check' ? e.target.checked : form.check
    })
  }

  return (
    <div>
      <input type="text" name="text" value={form.text} onChange={handleForm} />
      <input type="checkbox" name="check" value={form.check} onChange={handleForm} />
    </div>
  )
}
