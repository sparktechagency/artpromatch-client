/* eslint-disable react/no-unescaped-entities */
'use client'
import { Collapse } from 'antd';
import Search from 'antd/es/transfer/search';
import React from 'react';

const HelpPage = () => {
    const onSearch = (value) => {
        console.log("Search input: ", value);
    };

    const { Panel } = Collapse;
    return (
        <div className='container mx-auto md:my-20'>
            <div className='flex flex-col justify-center items-center '>
                <h1 className='text-2xl font-bold'>Help & Support</h1>
                <p className=' text-textSecondary'>Find answers, manage issues, or get in touch with us</p>
            </div>
            <div className="mt-4 md:mt-0">
                <Search allowClear placeholder="Search articles" onSearch={onSearch} enterButton />
            </div>
            <div className="mt-8">
                <Collapse accordion>
                    <Panel header="How do I book an appointment with an artist?" key="1">
                        <p>Visit the artist's profile, select 'Book Now,' and follow the steps to choose a date, time, and service.</p>
                    </Panel>
                    <Panel header="What is the cancellation policy?" key="2">
                        <p>Lorem ipsum dolor sit amet.</p>
                    </Panel>
                    <Panel header="How do I contact an artist directly?" key="3">
                        <p>Lorem ipsum dolor sit amet.</p>
                    </Panel>
                </Collapse>
            </div>
            <div className='mt-8 flex flex-col justify-center items-center p-5 bg-[#faf7f7] rounded-xl'>
                <h1 className='text-2xl font-bold mb-2'>Still have questions?</h1>
                <p className='text-textSecondary'> Can’t find the answer you’re looking for? Please chat to our friendly team.</p>
                <button className='px-6 py-2 rounded-xl bg-primary text-white'>get in touch </button>
            </div>
        </div>
    );
};

export default HelpPage; 