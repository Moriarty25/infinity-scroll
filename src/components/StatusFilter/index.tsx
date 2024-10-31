import { observer } from 'mobx-react-lite'
import { characterStore } from '../../store/charactersStore'
import { Select } from '@vkontakte/vkui'
import { ChangeEvent } from 'react'

export const StatusFilter = observer(() => {
	const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
		characterStore.setFilter(e.target.value)
	}
    const {statusFilter} = characterStore
    console.log(statusFilter);
    
	const filterOptions = [
		{ label: 'all', value: 'all' },
		{ label: 'alive', value: 'alive' },
		{ label: 'dead', value: 'dead' },
		{ label: 'unknown', value: 'unknown' }
	]

	return (
		<Select
			dropdownAutoWidth={true}
			value={statusFilter}
			onChange={handleFilterChange}
			options={filterOptions}
		/>
	)
})
