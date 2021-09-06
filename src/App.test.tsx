import React from 'react'
import { render, screen } from '@testing-library/react'

import App from './App'

describe('App', () => {
    it('Renders a header that includes a link to the homepage', () => {
        render(
            <App/>
        )
        expect(screen.queryByText('Recipe Manager')).not.toBeNull()
        expect(screen.getByText('Recipe Manager')).toHaveAttribute('href', '/')
    })
})