import {
	Button,
	ButtonGroup,
	Div,
	Group,
	ModalPage,
	ModalPageHeader,
	ModalRoot,
	Spacing,
	WriteBar,
	WriteBarIcon
} from '@vkontakte/vkui'
import { FC } from 'react'

type activeModal = 'modal' | null
type TModalProps = {
	id: number | null
	activeModal: activeModal
	setActiveModal: (arg: activeModal) => void
	headerText: string
	text: string
	placeholder?: string
	mode: 'edit' | 'delete' | null
	setText: (arg: string) => void
	onSendHandler: (id: number, newName: string) => void
	onDeleteHandler: (characterId: number) => void
	setCurrentId: (currentId: number | null) => void
}

export const Modal: FC<TModalProps> = ({
	id,
	mode,
	activeModal,
	setActiveModal,
	text,
	setText,
	onSendHandler,
	onDeleteHandler,
	setCurrentId,
	headerText,
	placeholder
}) => {
	function onCancelBtn() {
		setActiveModal(null)
	}

	function onDeleteBtn() {
		console.log(id, 'id')
		if (!id) return
		onDeleteHandler(id)
		onCloseModal()
	}

	function onEditNameBtn() {
		if (!id || !text.trim()) return
		onSendHandler(id, text)
		setText('')
		onCancelBtn()
	}

	function onCloseModal() {
		setActiveModal(null)
		setCurrentId(null)
	}
	return (
		<ModalRoot activeModal={activeModal}>
			<ModalPage
				id={'modal'}
				onClose={onCloseModal}
				header={
					<ModalPageHeader>
						<Div>{headerText}</Div>
					</ModalPageHeader>
				}
			>
				<Group>
					<Div>
						{mode === 'edit' ? (
							<WriteBar
								after={
									<>{text.length > 0 && <WriteBarIcon onClick={onEditNameBtn} mode="send" />}</>
								}
								value={text}
								onChange={(e) => setText(e.target.value)}
								placeholder={placeholder}
							/>
						) : (
							<ButtonGroup style={{ display: 'flex', justifyContent: 'center' }}>
								<Spacing>
									<Button onClick={onDeleteBtn} appearance="negative">
										Да
									</Button>
								</Spacing>
								<Spacing>
									<Button onClick={onCancelBtn} appearance="neutral">
										Нет
									</Button>
								</Spacing>
							</ButtonGroup>
						)}
					</Div>
				</Group>
			</ModalPage>
		</ModalRoot>
	)
}
