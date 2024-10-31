import {
	AdaptivityProvider,
	ConfigProvider,
	AppRoot,
	SplitLayout,
	SplitCol,
	View,
	Panel,
	PanelHeader,
	Header,
	Group,
	usePlatform,
	Spinner
} from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'
import { Character } from './components/Character'
import { useRef, useState } from 'react'
import { useScroll } from './hooks/useScroll'
import { observer } from 'mobx-react-lite'
import { characterStore } from './store/charactersStore'
import { Modal } from './components/Modal'
import { StatusFilter } from './components/StatusFilter'

export const App = observer(() => {
	const platform = usePlatform()
	const parentRef = useRef(null)
	const childRef = useRef(null)
	const { characters, loadCharacters, isLoading } = characterStore
	console.log(isLoading)
	useScroll(parentRef, childRef, loadCharacters)

	function onEditHandler(id: number, newName: string) {
		characterStore.editCharacterName(id, newName)
	}

	function onDeleteHandler(characterId: number) {
		characterStore.removeCharacter(characterId)
	}
	const [text, setText] = useState('')
	const [activeModal, setActiveModal] = useState<'modal' | null>(null)
	const [modeModal, setModeModal] = useState<'edit' | 'delete' | null>(null)
	const [currentId, setCurrentId] = useState<null | number>(null)

	const charactersElements = characters.map((character) => {
		return (
			<Character
				id={character.id}
				key={character.id}
				name={character.name}
				image={character.image}
				status={character.status}
				species={character.species}
				gender={character.gender}
				setActiveModal={setActiveModal}
				setModeModal={setModeModal}
				setCurrentId={setCurrentId}
			/>
		)
	})

	return (
		<ConfigProvider>
			<AdaptivityProvider>
				<AppRoot>
					<SplitLayout
						modal={
							<Modal
								id={currentId}
								mode={modeModal}
								activeModal={activeModal}
								headerText={
									modeModal === 'edit' ? 'Редактировать имя персонажа' : 'Удалить персонажа?'
								}
								placeholder="Введите новое имя"
								text={text}
								setActiveModal={setActiveModal}
								setCurrentId={setCurrentId}
								setText={setText}
								onSendHandler={onEditHandler}
								onDeleteHandler={onDeleteHandler}
							/>
						}
						header={platform !== 'vkcom' && <PanelHeader delimiter="none" />}
					>
						<SplitCol autoSpaced>
							<View activePanel="main">
								<Panel id="main">
									<PanelHeader>Rick and Morty</PanelHeader>
									<main ref={parentRef} style={{ height: '90vh', overflowY: 'auto' }}>
										<Group
											header={
												<Header
													style={{alignItems: 'center'}}
													mode="secondary"
													aside={<StatusFilter />}
												>
													 Characters
												</Header>
											}
										>
											{charactersElements}
											<div ref={childRef}>
												<Spinner size="medium" />
											</div>
										</Group>
									</main>
								</Panel>
							</View>
						</SplitCol>
					</SplitLayout>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	)
})
