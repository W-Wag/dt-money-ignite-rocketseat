import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'
import { Transactions } from './pages/Transactions'
import { TransactionsProvide } from './contexts/TransactionsContext'

export function App() {
  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <TransactionsProvide>
          <Transactions />
        </TransactionsProvide>

        <GlobalStyle />
      </ThemeProvider>
    </div>
  )
}
