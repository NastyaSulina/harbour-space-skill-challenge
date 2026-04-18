import { useState } from 'react'

import { Button, IconButton } from '@shared/ui'

export const App = () => {
    const [expanded, setExpanded] = useState(false)

    return (
        <main style={{ padding: 48, display: 'flex', gap: 24, alignItems: 'center' }}>
            <Button>Apply Now</Button>
            <IconButton
                ariaLabel='Toggle FAQ'
                isExpanded={expanded}
                onClick={() => setExpanded((prev) => !prev)}
            />
        </main>
    )
}

export default App
