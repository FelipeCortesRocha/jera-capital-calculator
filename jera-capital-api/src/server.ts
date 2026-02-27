import 'dotenv/config'
import crypto from 'crypto'
import express from 'express'
import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import { SimulationsTable as simulations } from './db/schema'
import { eq } from 'drizzle-orm'
import cors from 'cors'
import { calculateSimulation } from './processors/simulation'

const app = express()
const port = 4000

app.use(express.json())
app.use(cors())

const client = createClient({ url: process.env.DB_FILE_NAME ?? 'file:local.db' });
const db = drizzle({ client });

app.get('/simulations', async (_, res) => {
    try {
      const simulationsSaved = await db.select().from(simulations)
      
      res.json(simulationsSaved.map((simulation) => ({
        ...simulation,
        monthlyFixedIncome: simulation.monthlyFixedIncome.split(',').map(value => parseFloat(value)),
        monthlyVariableIncome: simulation.monthlyVariableIncome.split(',').map(value => parseFloat(value)),
        createdAt: new Date(parseInt(simulation.createdAt))
      })))
    } catch(error) {
      console.error(error)
      res.status(500).send('Internal server error')
    }
})

app.post('/simulations/calculate', async (req, res) => {
  const data = req.body

  if (
    !data.name ||
    !data.initialValue || 
    !data.periodInMonths || 
    !data.fixedIncome ||
    !data.variableIncome || 
    !data.createdAt
  ) res.status(400).send('Bad request')

  try {
    const newSimulation = calculateSimulation(data)
    
    res.json(newSimulation)
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal server error')
  }
})

app.post('/simulations', async (req, res) => {
    const data = req.body

    if (
      !data.name || 
      !data.initialValue || 
      data.monthlyContribution === null || 
      !data.periodInMonths ||
      data.fixedIncome === null ||
      data.variableIncome === null ||
      !data.monthlyFixedIncome ||
      !data.monthlyVariableIncome ||
      !data.incomeTaxFixed ||
      data.iofFixed === null ||
      !data.incomeTaxVariable ||
      data.iofVariable === null ||
      !data.profitabilityFixed ||
      !data.profitabilityVariable ||
      !data.createdAt
    ) res.status(400).send('Bad request')
    
    try {
      const formattedData = {
        ...data,
        id: crypto.randomUUID(),
        monthlyFixedIncome: data.monthlyFixedIncome.toString(),
        monthlyVariableIncome: data.monthlyVariableIncome.toString(),
        createdAt: new Date(data.createdAt).getTime(),
      }

      const newSimulation = await db.insert(simulations).values(formattedData)

      if (newSimulation) res.json(formattedData)
      else throw new Error()
    } catch (error) {
      console.error(error)
      res.status(500).send('Internal server error')
    }
})

app.delete('/simulations/:id', async (req, res) => {
  const simulationId = req.params.id

  if (!simulationId) res.status(400).send('Bad request')

  try {
    await db.delete(simulations).where(eq(simulations.id, simulationId)) 
    res.status(204).send()
  } catch (error) {
    res.status(500).send('Internal server error')
  }
  
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
