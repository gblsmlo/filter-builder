import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { FilterBuilder } from './filter-builder'
import type { FilterBuilderAttribute, FilterCondition } from './types'

const taskAttributes = [
  {
    id: 'status',
    label: 'Status',
    operators: [
      { label: 'é', value: 'is' },
      { label: 'não é', value: 'is-not' },
    ],
    options: [
      { label: 'Pendente', value: 'pending' },
      { label: 'Em andamento', value: 'in-progress' },
      { label: 'Concluída', value: 'done' },
    ],
    valueType: 'select',
  },
  {
    id: 'priority',
    label: 'Prioridade',
    operators: [{ label: 'é', value: 'is' }],
    options: [
      { label: 'Baixa', value: 'low' },
      { label: 'Média', value: 'medium' },
      { label: 'Alta', value: 'high' },
    ],
    valueType: 'select',
  },
] satisfies FilterBuilderAttribute[]

const leadAttributes = [
  {
    id: 'stage',
    label: 'Etapa',
    operators: [
      { label: 'é', value: 'is' },
      { label: 'não é', value: 'is-not' },
    ],
    options: [
      { label: 'Novo', value: 'new' },
      { label: 'Qualificação', value: 'qualification' },
      { label: 'Proposta', value: 'proposal' },
    ],
    valueType: 'select',
  },
  {
    id: 'owner',
    label: 'Responsável',
    operators: [{ label: 'é', value: 'is' }],
    options: [
      { label: 'Marina Costa', value: 'marina' },
      { label: 'Rafael Nunes', value: 'rafael' },
    ],
    valueType: 'select',
  },
] satisfies FilterBuilderAttribute[]

interface FilterBuilderStoryProps {
  attributes?: readonly FilterBuilderAttribute[]
  initialValue?: readonly FilterCondition[]
}

function FilterBuilderStory({
  attributes = taskAttributes,
  initialValue = [],
}: Readonly<FilterBuilderStoryProps>) {
  const [value, setValue] = useState<FilterCondition[]>(() => [...initialValue])
  return <FilterBuilder attributes={attributes} onValueChange={setValue} value={value} />
}

const meta = {
  component: FilterBuilderStory,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  title: 'Patterns/FilterBuilder',
} satisfies Meta<typeof FilterBuilderStory>

export default meta

type Story = StoryObj<typeof meta>

export const Empty: Story = {
  render: () => <FilterBuilderStory />,
}

export const SingleCondition: Story = {
  render: () => (
    <FilterBuilderStory
      initialValue={[{ attributeId: 'status', operator: 'is', value: 'in-progress' }]}
    />
  ),
}

export const MultipleConditions: Story = {
  render: () => (
    <FilterBuilderStory
      initialValue={[
        { attributeId: 'status', operator: 'is', value: 'in-progress' },
        { attributeId: 'priority', operator: 'is', value: 'high' },
      ]}
    />
  ),
}

export const AppliedFilters: Story = {
  render: () => (
    <FilterBuilderStory
      initialValue={[
        { attributeId: 'status', operator: 'is-not', value: 'done' },
        { attributeId: 'priority', operator: 'is', value: 'high' },
      ]}
    />
  ),
}

export const TasksContext: Story = {
  render: () => <FilterBuilderStory attributes={taskAttributes} />,
}

export const LeadsContext: Story = {
  render: () => <FilterBuilderStory attributes={leadAttributes} />,
}

export const IncompleteCondition: Story = {
  render: () => <FilterBuilderStory />,
}
