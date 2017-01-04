import React from 'react';
import MinusSquare from 'react-icons/lib/fa/minus-square';
import PlusSquare from 'react-icons/lib/fa/plus-square';
import Minus from 'react-icons/lib/fa/minus';
import Plus from 'react-icons/lib/fa/plus';
import Film from 'react-icons/lib/fa/film';
import Edit from 'react-icons/lib/fa/edit';
import Calculator from 'react-icons/lib/fa/calculator';

class ItemsBox extends React.Component {
	static get propTypes() {
		return {
			item: React.PropTypes.object.isRequired,
			children: React.PropTypes.array,
			prewords: React.PropTypes.string,
			order: React.PropTypes.number,
			updateStatusFunc: React.PropTypes.func,
			addItemFunc: React.PropTypes.func,
			clickEditFunc: React.PropTypes.func,
			deleteItemFunc: React.PropTypes.func,
			clickInputNumberFunc: React.PropTypes.func,
			editable: React.PropTypes.bool,
		}
	}
	constructor(props) {
		super(props);
		this.state = {
			showChild: false,
		};
	}
	/* I do the whole shouldComponentUpdate judge by myself, because the data we pass into this component
	are not as usual, so it's inevitible. */
	shouldComponentUpdate(nextProps, nextState) {
		const currentProps = this.props;
		const currentState = this.state;
		let isChildrenLinkChange = false;
		let isChildrenNumberChange =false;
		if (currentProps.children) {
			for (let i = 0; i < currentProps.children.length; i++) {
				if (currentProps.children[i] && nextProps.children[i]) {
					const [currentChildItem, nextChildItem] = [currentProps.children[i].props.item, nextProps.children[i].props.item];
					if ((currentChildItem.link !== nextChildItem.link)
						||(currentChildItem.title !== nextChildItem.title)) {
						isChildrenLinkChange = true;
					}
				}
			}
		}
		if (currentProps.children) {
			for (let i = 0; i < currentProps.children.length; i++) {
				if (currentProps.children[i] && nextProps.children[i]) {
					if (currentProps.children[i].props.childNumber !== nextProps.children[i].props.childNumber) {
						isChildrenNumberChange = true;
					}
				}
			}
		}
		return (currentProps.item.status !== nextProps.item.status)
			|| (currentProps.item.link !== nextProps.item.link)
			|| (currentProps.item.title !== nextProps.item.title)
			|| (currentProps.item.episodeNumber !== nextProps.item.episodeNumber)
			|| (currentState.showChild !== nextState.showChild)
			|| ((currentProps.children !== undefined) && (currentProps.children.length !== nextProps.children.length))
			|| isChildrenNumberChange
			|| isChildrenLinkChange;

	}
	componentWillReceiveProps(nextProps) {
	}
	componentDidUpdate() {
	}
	switchChildDisplay() {
		this.setState({
			showChild: !this.state.showChild
		});
	}
	render () {
		const style = require('./ItemsBox.scss');
		const { item, children, prewords, order, updateStatusFunc, addItemFunc, clickEditFunc, deleteItemFunc, displayStyle, childNumber, childNumberPrewords, editable, clickInputNumberFunc } = this.props;
		const { showChild } = this.state;
		const title = item.title?item.title:(prewords + (order+1));
		const link = item.link?item.link:null;
		let [signalColor, signalWord] = [];
		switch (item.status) {
		case 0:
			signalColor = style.green;
			signalWord = '完成';
			break;
		case 1:
			signalColor = style.orange;
			signalWord = '追蹤';
			break;
		case 2:
			signalColor = style.orange;
			signalWord = 'follow';
			break;
		default:
			break;
		}
		return (
			<div style={ {display: displayStyle} } className={style.box}>
				<div className={style.titleContainer}>
					<span className={style.title}>{title || '沒有名稱'}</span>
					<div className={style.rightItems}>
						<span className={childNumber?style.number:style.invisible}><b>{childNumberPrewords}{childNumber}</b></span>
						<div className={style.light + ' ' + signalColor} onClick={editable?updateStatusFunc:(function(){})}>{signalWord}</div>

							<Edit onClick={clickEditFunc} className={editable?style.functionIcon:style.invisible} />
							<a style={ {'display': link?'initial':'none'} } href={link} target={"_blank"}>
								<Film className={style.functionIcon} />
							</a>
							<div>
								<MinusSquare
									style={ {'display': showChild?'initial':'none'} }
									className={style.functionIcon}
									onClick={this.switchChildDisplay.bind(this)}
								/>
							</div>
							<div>
								<PlusSquare
									style={ {'display': showChild?'none':'initial'} }
									className={style.functionIcon}
									onClick={this.switchChildDisplay.bind(this)}
								/>
							</div>

					</div>
				</div>
				<div className={style.content}>
					<div className={showChild?style.leftBox:style.invisible}>
						<Minus
							className={editable?style.minusItemIcon:style.invisible}
							onClick={deleteItemFunc}
						/>
						<Plus
							className={editable?style.addItemIcon:style.invisible}
							onClick={addItemFunc}
						/>
						<Calculator
							className={(editable&&clickInputNumberFunc)?style.minusItemIcon:style.invisible}
							onClick={clickInputNumberFunc}
						/>
					</div>
					<div className={showChild?style.childContainer:style.invisible}>
						{children}
					</div>
				</div>
			</div>
		);
	}
}

export default ItemsBox;
