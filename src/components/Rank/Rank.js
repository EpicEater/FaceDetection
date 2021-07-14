function Rank({ name, entries}) {
    return (
        <div>
            <div className='white f3 center'>
                {`${name}, your current entry count is...`}
            </div>
            <div className='white f2 center'>
                {`${entries}`}
            </div>
        </div>
    )
}

export default Rank;