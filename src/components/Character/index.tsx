import { Banner, Button, ButtonGroup, Div, Image } from '@vkontakte/vkui'
import { FC } from 'react'
import { TCharacterProps } from './typing'

export const Character: FC<TCharacterProps> = ({
	name,
	image,
	status,
	species,
	setActiveModal,
	setModeModal,
	setCurrentId,
	id,
	gender
}) => {
	function onDelete() {
		setCurrentId(id)
		setActiveModal('modal')
		setModeModal('delete')
	}
	function onEdit() {
		setCurrentId(id)
		setActiveModal('modal')
		setModeModal('edit')
	}

	return (
		<Div>
			<Banner
				before={<Image size={96} src={image} />}
				header={name}
				subheader={
					<>
						{/* <MiniInfoCell
						//before={<Icon20FollowersOutline />}
						>
							<Spacing>
							status · {status} 
							</Spacing>
							<Spacing>
							species · {species}  
							</Spacing>
							<Spacing>
							gender · {gender}
							</Spacing>
							
						</MiniInfoCell> */}
						<li>"status": {status}</li>
						<li>"species": {species}</li>
						<li>"gender": {gender}</li>
					</>
				}
				actions={
					<ButtonGroup>
						<Button onClick={onEdit} appearance="positive">
							Редактировать
						</Button>
						<Button onClick={onDelete} appearance="negative">
							Удалить
						</Button>
					</ButtonGroup>
				}
			/>
		</Div>
	)
}