import React from 'react'
import { AnimatedCard } from '../../Components'

const ComponentsPage = () => {
    return (
        <div className='w-[575px]'>
            <AnimatedCard
                contentTextStyle={'!text-[48px] !font-[600]'} // style for normal text
                animateStyle={'!text-[48px] text-[red] !font-[600]'} // style for animated text
                contentText={'Find trusted home service professionals for your next'} //normal text content
                texts={['Cleaning', 'Handyman', 'Nanny Service', 'Cooking']} // animated content
                mainClassName="text-black overflow-hidden justify-center"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
            />
        </div>
    )
}

export default ComponentsPage
