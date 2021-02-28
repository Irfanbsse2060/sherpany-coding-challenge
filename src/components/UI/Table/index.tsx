import React from 'react'
import './Table.scss'

interface Header {
    name: string,
    label: string,
    customComponent?: (value: string) => React.ReactElement
}

interface CommentListProps {
    data: any[],
    header: Header[],
    testId?: string
}

export default function Table(props: CommentListProps) {

    const {data, header, testId} = props

    return (
        <table className='custom-table' data-testid={testId}>
            <thead>
                <tr className='custom-table__row'>
                    {
                        header.map((item, index) => {
                            return <th className='custom-table__row--header-column' key={index}>{item.label}</th>
                        })
                    }
                </tr>
            </thead>
            <tbody>
            {
                data.map((item, index) => {
                    return (
                        <tr key={index} className='custom-table__row' data-testid='custom-table-data-rows'>
                            {
                                header.map((head,headIndex) => {
                                    return (<td className='custom-table__row--body-column' key={headIndex}>
                                        {head.customComponent ? head.customComponent(item[head.name]) : item[head.name]}
                                    </td>)
                                })
                            }
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )

}
