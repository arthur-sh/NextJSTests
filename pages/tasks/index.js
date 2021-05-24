import Head from 'next/head'
import { useEffect, useState } from 'react'
import TaskClient from '../../client/TaskClient'
import Container from '../../components/container'
import TaskTable from '../../components/TaskTable/TaskTable'

export default function Tasks(){

    
    

    return(
        <>
        <Container>
            <Head>
                <title>Dashboard</title>
            </Head>

        <TaskTable />

        </Container>
        </>
    )
    }