/* eslint-disable react-x/no-array-index-key */
import { LoadStatus, useScholarship } from '@entities/scholarship'

export const App = () => {
    const { status, data } = useScholarship('data-science-apprenticeship-zeptolab')

    return (
        <main>
            {status === LoadStatus.Success && data && (
                <>
                    <p>ID: {data.scholarship.id}</p>
                    <p>Name: {data.scholarship.name}</p>
                    <p>Position: {data.scholarship.position}</p>
                    <p>Location: {data.scholarship.location}</p>
                    <p>Duration: {data.scholarship.duration}</p>
                    <p>Start date: {data.scholarship.startDate.toDateString()}</p>
                    <p>Application ends: {data.scholarship.applicationEndDate.toDateString()}</p>
                    <p>Company: {data.scholarship.company.name}</p>
                    <img src={data.scholarship.company.logoSrc} alt='' />

                    {data.scholarship.description.map((block, i) =>
                        block.type === 'paragraph' ? (
                            <p key={i}>{block.data}</p>
                        ) : (
                            <ul key={i}>
                                {block.data.map((item, j) => (
                                    <li key={j}>{item}</li>
                                ))}
                            </ul>
                        ),
                    )}
                </>
            )}
        </main>
    )
}

export default App
