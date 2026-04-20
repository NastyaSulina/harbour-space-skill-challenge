import { useCallback } from 'react'

import { Faqs, Hero, Slider } from '@widgets/scholarship'

import { LoadStatus, useScholarship } from '@entities/scholarship'

const App = () => {
    const { status, data } = useScholarship('data-science-apprenticeship-zeptolab')
    const { scholarship } = data || {}

    const onApply = useCallback(() => {
        console.log('Apply')
    }, [])

    return (
        <main>
            {status === LoadStatus.Success && scholarship && (
                <>
                    <Hero
                        name={scholarship.name}
                        description={scholarship.description}
                        position={scholarship.position}
                        company={scholarship.company}
                        location={scholarship.location}
                        duration={scholarship.duration}
                        startDate={scholarship.startDate}
                        onApply={onApply}
                    />
                    <Slider items={scholarship.whatYouWillLearn} title='What you will learn' />
                    <Faqs faqs={scholarship.faqs} />
                </>
            )}
        </main>
    )
}

export default App
