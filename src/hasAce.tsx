const hasAce = ( hand: any ) => {
    return hand[0].props.rank === 'A' || hand[1].props.rank === 'A'
}

export default hasAce;