import moment from 'moment'

export function durationFormatter(value) {
	let time = moment(value).fromat('DD:hhmm:ss').split(':')
}
