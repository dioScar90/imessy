import { PointerEvent } from 'react'

const getTextoParaComparar = (cellElement: HTMLTableCellElement) =>
  cellElement.innerText.trim().toLowerCase()

const verificarSeEhData = (...textos: string[]) => {
  const pattern /* Ex: 31/08/2023 */ = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
  return textos.every(txt => pattern.test(txt))
}

const parseDateToISOString = (dateString: string) => {
  const [day, month, year] = dateString.split('/')
  const parsedDate = new Date(`${year}-${month}-${day}`)
  return parsedDate.toISOString()
}

type LocaleCompareOptions = {
  numeric: boolean
}

type SeuPai = any[] | (LocaleCompareOptions | undefined)[]

const compararTextos = (text1: string, text2: string, desc: boolean, options: SeuPai = []) => {
  return desc === true
    ? text2.localeCompare(text1, ...options)
    : text1.localeCompare(text2, ...options)
}

type SuaMae = {
  row1: HTMLTableRowElement
  row2: HTMLTableRowElement
  cellIndex: number
  desc: boolean
}

const ordenarItens = ({ row1, row2, cellIndex, desc }: SuaMae) => {
  const text1 = getTextoParaComparar(row1.children[cellIndex] as HTMLTableCellElement)
  const text2 = getTextoParaComparar(row2.children[cellIndex] as HTMLTableCellElement)

  if (verificarSeEhData(text1, text2)) {
    const date1 = parseDateToISOString(text1)
    const date2 = parseDateToISOString(text2)
    return compararTextos(date1, date2, desc)
  }

  const options: SeuPai = [undefined, { numeric: true }]
  return compararTextos(text1, text2, desc, options)
}

const prepararItensEOrdenar = (thClicado: HTMLTableCellElement, desc: boolean = false) => {
  const table = thClicado.closest('table')
  const tbody = table?.querySelector('tbody')

  if (!table || !tbody) {
    return
  }

  const cellIndex = thClicado.cellIndex // + 1
  // const selector = ':is(td, th):nth-child(' + n + ')'

  const tbodyChildren = tbody.querySelectorAll<HTMLTableRowElement>(':scope > tr')

  const linhasClonadas = [...tbodyChildren].map(row => row.cloneNode(true)) as HTMLTableRowElement[]

  linhasClonadas.sort((row1, row2) => ordenarItens({ row1, row2, cellIndex, desc }))
  tbody.replaceChildren(...linhasClonadas)

  const tipoDoIcone = desc === true ? 'down' : 'up'
  const spanDoIcone = `<span class="fas fa-sort-amount-${tipoDoIcone}-alt" data-icon-sort>&nbsp;</span>`
  thClicado.insertAdjacentHTML('afterbegin', spanDoIcone)

  thClicado.classList.add('bg-primary')
}

const removeFontAwesome = (cellIndex: number, tr: HTMLTableRowElement) => {
  const todosTh: NodeListOf<HTMLTableCellElement> = tr.querySelectorAll(':scope > th')
  const asc = todosTh[cellIndex].toggleAttribute('data-order-by')
  
  todosTh.forEach(th => {
    const iFontAwesome = th.querySelector('[data-icon-sort]')
    th.classList.remove('bg-primary')

    iFontAwesome?.remove()

    if (th.cellIndex !== cellIndex) {
      th.removeAttribute('data-order-by')
    }
  })

  const desc = !asc

  return desc
}

export const ordenarTabelaPorDeterminadaColuna = (e: PointerEvent<HTMLTableCellElement>) => {
  const thClicado = e.currentTarget
  const tr = thClicado.closest('tr')

  if (!tr) {
    return
  }

  const cellIndex = thClicado.cellIndex
  const desc = removeFontAwesome(cellIndex, tr)
  
  const table = thClicado.closest('table')
  const tbody = table?.querySelector('tbody')

  if (!table || !tbody) {
    return
  }

  // const cellIndex = thClicado.cellIndex // + 1
  // const selector = ':is(td, th):nth-child(' + n + ')'

  const tbodyChildren = tbody.querySelectorAll<HTMLTableRowElement>(':scope > tr')

  const linhasClonadas = [...tbodyChildren].map(row => row.cloneNode(true)) as HTMLTableRowElement[]

  linhasClonadas.sort((row1, row2) => ordenarItens({ row1, row2, cellIndex, desc }))
  tbody.replaceChildren(...linhasClonadas)

  const tipoDoIcone = desc === true ? 'down' : 'up'
  const spanDoIcone = `<span class="fas fa-sort-amount-${tipoDoIcone}-alt" data-icon-sort>&nbsp;</span>`
  thClicado.insertAdjacentHTML('afterbegin', spanDoIcone)

  thClicado.classList.add('bg-primary')
}
