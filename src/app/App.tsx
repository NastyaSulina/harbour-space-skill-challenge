import { Faqs, Hero } from '@widgets/scholarship'

import { LoadStatus, useScholarship } from '@entities/scholarship'

const App = () => {
    const { status, data } = useScholarship('data-science-apprenticeship-zeptolab')
    const { scholarship } = data || {}

    return (
        <main>
            {status === LoadStatus.Success && scholarship && (
                <>
                    <Hero scholarship={scholarship}></Hero>
                    <Faqs faqs={scholarship.faqs}></Faqs>
                </>
            )}
        </main>
    )
}

export default App
