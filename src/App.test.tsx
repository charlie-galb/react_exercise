import React from 'react'
import { render, screen } from '@testing-library/react'

import App from './App'

describe('App', () => {
    it('Renders a header', () => {
        render(
            <App/>
        )
        expect(screen.queryByText('Recipe Manager')).not.toBeNull()
    })
})