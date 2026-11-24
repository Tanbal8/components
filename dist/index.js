import './index.css';
import { useCallback as e, useEffect as t, useState as n } from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { FaCaretDown as a, FaCaretUp as o, FaCheckCircle as s, FaTimesCircle as c } from "react-icons/fa";
import { IoWarningSharp as l } from "react-icons/io5";
import { TbMessageCircleFilled as u } from "react-icons/tb";
import { FaXmark as d } from "react-icons/fa6";
//#region toast/toast-item/ToastItem.jsx
var f = ({ toastData: a, removeToast: o }) => {
	let { id: s, title: c, message: l, icon: u, color: d } = a, [f, p] = n(!1), [m, h] = n(!1), g = e(() => {
		p(!1), h(!0), setTimeout(() => o(s), 200);
	}, [s, o]);
	return t(() => {
		p(!0);
		let e = setTimeout(g, 5e3);
		return () => {
			clearTimeout(e);
		};
	}, []), /* @__PURE__ */ i("div", {
		className: `toast ${f ? "showing" : ""} ${m ? "removing" : ""}`,
		style: { color: d },
		onClick: g,
		children: [/* @__PURE__ */ r("div", {
			className: "toast-status-icon",
			children: u
		}), /* @__PURE__ */ i("div", {
			className: "toast-content",
			children: [/* @__PURE__ */ r("div", {
				className: "toast-title",
				children: c
			}), l && /* @__PURE__ */ r("div", {
				className: "toast-message",
				dir: "auto",
				children: l
			})]
		})]
	});
}, p = new class {
	#e = [];
	#t = null;
	setState(e = () => {}) {
		let t = (t, n, r, i, a) => {
			e((e) => {
				let o = e.length > 0 ? Math.max(...e.map((e) => e.id)) + 1 : 1;
				return [...e, {
					id: o,
					type: t,
					title: n,
					message: r,
					icon: i,
					color: a
				}];
			});
		};
		this.#t = t, this.#n();
	}
	#n() {
		this.#e.length > 0 && (this.#e.forEach((e) => {
			this.#t(e.type, e.title, e.message, e.icon);
		}), this.#e = []);
	}
	#r({ type: e, title: t, message: n, icon: r, color: i }) {
		let a = {
			type: e,
			title: t,
			message: n,
			icon: r,
			color: i
		};
		this.#t ? this.#t(a.type, a.title, a.message, a.icon, a.color) : this.#e.push(a);
	}
	success(e, t) {
		this.#r({
			type: "success",
			title: e,
			message: t,
			icon: /* @__PURE__ */ r(s, {}),
			color: "green"
		});
	}
	error(e, t) {
		this.#r({
			type: "error",
			title: e,
			message: t,
			icon: /* @__PURE__ */ r(c, {}),
			color: "red"
		});
	}
	warn(e, t) {
		this.#r({
			type: "warn",
			title: e,
			message: t,
			icon: /* @__PURE__ */ r(l, {}),
			color: "orange"
		});
	}
	info(e, t) {
		this.#r({
			type: "info",
			title: e,
			message: t,
			icon: /* @__PURE__ */ r(u, {}),
			color: "yellow"
		});
	}
}(), m = () => {
	let [e, i] = n([]);
	t(() => {
		p.setState(i);
	}, []);
	let a = (e) => {
		i((t) => t.filter((t) => t.id !== e));
	};
	return /* @__PURE__ */ r("div", {
		id: "toast-container",
		children: e.map((e) => /* @__PURE__ */ r(f, {
			toastData: e,
			removeToast: a
		}, e.id))
	});
}, h = new class {
	#e = null;
	#t = null;
	setState(e) {
		this.#e = e;
	}
	open({ title: e = "", messages: t = [], options: n = [{
		title: "OK",
		value: !0
	}, {
		title: "Cancel",
		value: !1
	}] } = {}) {
		return new Promise((r) => {
			this.#t = r, this.#e({
				title: e,
				messages: t,
				options: n
			});
		});
	}
	resolve(e) {
		this.#t?.(e), this.#t = null, this.#e(null);
	}
}(), g = () => {
	let [e, a] = n(null), [o, s] = n(!1), [c, l] = n(!1);
	if (t(() => {
		h.setState(a);
	}, []), t(() => {
		e && (l(!1), requestAnimationFrame(() => {
			s(!0);
		}));
	}, [e]), !e) return null;
	let { title: u = "", messages: f = [], options: p = [{
		title: "OK",
		value: !0
	}, {
		title: "Cancel",
		value: !1
	}] } = e, m = (e) => {
		l(!0), s(!1), setTimeout(() => {
			h.resolve(e);
		}, 200);
	}, g = (e, t) => e.color ? e.color : p.length === 1 || t === 0 ? "#2563eb" : t === p.length - 1 ? "#dc2626" : "#6b7280";
	return /* @__PURE__ */ r("div", {
		className: "dialog-overlay",
		children: /* @__PURE__ */ i("div", {
			className: `dialog ${o && !c ? "visible" : ""}`,
			children: [
				/* @__PURE__ */ r("button", {
					className: "dialog-close",
					onClick: () => m(null),
					children: /* @__PURE__ */ r(d, {})
				}),
				/* @__PURE__ */ i("div", {
					className: "dialog-messages",
					children: [/* @__PURE__ */ r("div", {
						className: "dialog-title",
						children: u
					}), f.map((e, t) => /* @__PURE__ */ r("div", { children: e }, `message-${t}`))]
				}),
				/* @__PURE__ */ r("div", {
					className: "dialog-buttons",
					children: p.map((e, t) => /* @__PURE__ */ r("button", {
						onClick: () => m(e.value === void 0 ? null : e.value),
						style: { backgroundColor: g(e, t) },
						children: e.title
					}, e.value || t))
				})
			]
		})
	});
}, _ = class e {
	constructor(e, t, n, r) {
		try {
			typeof e == "string" && (e = Number(e)), typeof t == "string" && (t = Number(t)), typeof n == "string" && (n = Number(n)), typeof r == "string" && (r = Number(r));
		} catch {
			throw Error("Invalid values");
		}
		if (e < 1 || t < 1 || t > 12 || n < 1 || n > 31 || t > 6 && n > 30 || t === 12 && n > 29 && !this.isLeapYear(e)) throw Error(`Invalid date ${e}/${t}/${n}`);
		this.setDate(e, t, n, r);
	}
	nextDay() {
		let e = this.copy();
		return e.day++, e.dayNumber = (e.dayNumber + 1) % 7, e.day > e.monthDays ? e.month === 12 ? e.setDate(e.year + 1, 1, 1) : e.setDate(e.year, e.month + 1, 1) : e._updateInformation(), e;
	}
	nextWeek() {
		return this.next("day", 7);
	}
	nextMonth() {
		let e = this.copy();
		return e.month++, e.month > 12 && (e.month = 1, e.year++), e.day > e.calculateMonthDays() && (e.day = e.calculateMonthDays()), e.dayNumber = y(e.dayNumber + this.monthDays % 7 + (e.day - this.day), 7), e._updateInformation(), e;
	}
	nextYear() {
		let e = this.copy();
		return e.year++, e.month === 12 && e.day === 30 && !e.isLeapYear() && (e.day = 29), e.dayNumber = y(this.dayNumber + (this.isLeapYear() ? 2 : 1), 7), e._updateInformation(), e;
	}
	next(e, t = 1) {
		let n = this._unitCheck(e), r = this.copy();
		switch (n) {
			case "day":
				let e = 0;
				for (; e < t;) {
					let n = r.copy();
					r = t - e >= 366 ? r.nextYear() : t - e >= 31 ? r.nextMonth() : r.nextDay(), e += r.diff(n);
				}
				break;
			case "week":
				r = this.next("day", t * 7);
				break;
			default: for (let e = 0; e < t; e++) r = r[`next${v(n)}`]();
		}
		return r;
	}
	previousDay() {
		let e = this.copy();
		return e.day--, e.dayNumber = e.dayNumber > 0 ? e.dayNumber - 1 : 6, e.day < 1 ? e.month === 1 ? e.setDate(e.year - 1, 12, e.isLeapYear(e.year - 1) ? 30 : 29) : e.setDate(e.year, e.month - 1, e.calculateMonthDays()) : e._updateInformation(), e;
	}
	previousWeek() {
		return this.previous("day", 7);
	}
	previousMonth() {
		let e = this.copy();
		return e.month--, e.month < 1 && (e.month = 12, e.year--), e.day > e.calculateMonthDays() && (e.day = e.calculateMonthDays()), e.dayNumber = y(e.dayNumber - (e.calculateMonthDays() - e.day + this.day) % 7, 7), e._updateInformation(), e;
	}
	previousYear() {
		let e = this.copy();
		return e.year--, e.month === 12 && e.day === 30 && !e.isLeapYear() && (e.day = 29), e.dayNumber = y(e.dayNumber - (e.isLeapYear() ? 2 : 1), 7), e._updateInformation(), e;
	}
	previous(e, t = 1) {
		let n = this._unitCheck(e), r = this.copy();
		switch (n) {
			case "day":
				let e = 0;
				for (; e < t;) {
					let n = r.copy();
					r = t - e >= 366 ? r.previousYear() : t - e >= 31 ? r.previousMonth() : r.previousDay(), e += r.diff(n);
				}
				break;
			case "week":
				r = this.previous("day", t * 7);
				break;
			default: for (let e = 0; e < t; e++) r = r[`previous${v(n)}`]();
		}
		return r;
	}
	getWeekDays() {
		let e = this.startOf("week"), t = [];
		for (let n = 0; n < 7; n++) t.push(e.copy()), e = e.nextDay();
		return t;
	}
	getMonthDays() {
		let t = y(this.dayNumber - (this.day - 1), 7);
		return Array.from({ length: this.monthDays }, (n, r) => new e(this.year, this.month, r + 1, (t + r) % 7));
	}
	getYearDays(t = !1) {
		let n = this.nthDayOfYear(), r = y(this.dayNumber - (n - 1), 7), i = t ? 12 : this.month, a = [];
		for (let t = 1; t <= i; t++) for (let n = 1; n <= this.calculateMonthDays(t); n++) a.push(new e(this.year, t, n, (r + a.length) % 7));
		return a;
	}
	getDayNumber() {
		let t = e.today(), n = t.isBefore(this) ? t.diff(this) : -t.diff(this);
		return y(t.dayNumber + n, 7);
	}
	get(e, t = 1) {
		let n = ["next", "previous"], r = this._unitCheck(e, [], n);
		if (e === "day") return [this.copy()];
		if (n.includes(e)) {
			let n = this.copy(), r = [];
			for (let i = 0; i < t; i++) n = n[`${e}Day`](), r.push(n.copy());
			return r;
		}
		return this[`get${v(r)}Days`]();
	}
	startOf(t) {
		switch (this._unitCheck(t, ["day"])) {
			case "week": return this.previous("day", this.dayNumber);
			case "month": {
				let t = this.day - 1, n = y(this.dayNumber - t, 7);
				return new e(this.year, this.month, 1, n);
			}
			case "year": {
				let t = this.nthDayOfYear() - 1, n = y(this.dayNumber - t, 7);
				return new e(this.year, 1, 1, n);
			}
		}
	}
	endOf(t) {
		switch (this._unitCheck(t, ["day"])) {
			case "week": return this.next("day", 6 - this.dayNumber);
			case "month": {
				let t = this.calculateMonthDays() - this.day, n = (this.dayNumber + t) % 7;
				return new e(this.year, this.month, this.calculateMonthDays(), n);
			}
			case "year": {
				let t = this.calculateYearDays() - this.nthDayOfYear(), n = (this.dayNumber + t) % 7;
				return new e(this.year, 12, this.calculateMonthDays(12), n);
			}
		}
	}
	isBefore(e) {
		return this.toNumber() < e.toNumber();
	}
	isAfter(e) {
		return this.toNumber() > e.toNumber();
	}
	isSame(e) {
		return this.toNumber() === e.toNumber();
	}
	isToday() {
		return this.isSame(e.today());
	}
	isBeforeToday() {
		return this.isBefore(e.today());
	}
	isAfterToday() {
		return this.isAfter(e.today());
	}
	isLeapYear(e = this.year) {
		let t = [
			-61,
			9,
			38,
			199,
			426,
			686,
			756,
			818,
			1111,
			1181,
			1210,
			1635,
			2060,
			2097,
			2192,
			2262,
			2324,
			2394,
			2456,
			3178
		], n = t[0], r = 0;
		for (let i of t.slice(1)) {
			if (r = i - n, e < i) break;
			n = i;
		}
		let i = e - n;
		return i >= r ? !1 : (r - i < 6 && (i += Math.floor((r + 4) / 33) * 33 - r), (i + 1) % 33 % 4 == 0 && (r !== 33 || (i + 1) % 33 != 1));
	}
	nthDayOfYear() {
		let e = 0;
		for (let t = 1; t < this.month; t++) e += this.calculateMonthDays(t);
		return e += this.day, e;
	}
	calculateMonthDays(e = this.month, t = this.year) {
		return e <= 6 ? 31 : e < 12 || this.isLeapYear(t) ? 30 : 29;
	}
	calculateYearDays(e = this.year) {
		return this.isLeapYear(e) ? 366 : 365;
	}
	toNumber() {
		return this.year * 1e4 + this.month * 100 + this.day;
	}
	diff(e) {
		let t = this.isBefore(e) ? this : e, n = this.isAfter(e) ? this : e;
		if (this.year === e.year) return n.nthDayOfYear() - t.nthDayOfYear();
		{
			let e = 0;
			for (let r = t.year + 1; r < n.year; r++) e += this.calculateYearDays(r);
			return e += t.calculateYearDays() - t.nthDayOfYear() + 1, e += n.nthDayOfYear(), e;
		}
	}
	setDate(e, t, n, r = null) {
		this.year = e, this.month = t, this.day = n, this.dayNumber = r ?? this.getDayNumber(), this._updateInformation();
	}
	copy() {
		return new e(this.year, this.month, this.day, this.dayNumber);
	}
	toString() {
		return this.toDate();
	}
	toPersianString(e = !1) {
		return `${this.day} ${this.monthName}${e ? " " + this.year : ""}`;
	}
	toDate(e = "-") {
		return `${this.year.toString()}${e}${this.month.toString().padStart(2, "0")}${e}${this.day.toString().padStart(2, "0")}`;
	}
	_unitCheck(e, t = [], n = []) {
		let r = e;
		if (![
			"day",
			"week",
			"month",
			"year"
		].includes(r) && !n.includes(r) || t.includes(r)) {
			console.error("Error", "Invalid time unit");
			return;
		}
		return r;
	}
	_updateInformation() {
		this.dayName = b[this.dayNumber], this.monthName = x[this.month - 1], this.monthDays = this.calculateMonthDays();
	}
};
_.today = () => {
	let e = new Intl.DateTimeFormat("fa-u-nu-latn").format(Date.now()).split("/"), t = ((/* @__PURE__ */ new Date()).getDay() + 1) % 7;
	return new _(...e.map(Number), t);
}, _.parseDate = (e, t = "-") => {
	if (!RegExp(`^\\d{4}${t}\\d{2}${t}\\d{2}$`).test(e)) throw Error(`Invalid format: ${e}\nIt should be YYYY-MM-DD`);
	return new _(...e.split(t));
};
var v = (e) => e[0].toUpperCase() + e.slice(1), y = (e, t = 7) => (e % t + t) % t, b = [
	"شنبه",
	"یکشنبه",
	"دوشنبه",
	"سه‌شنبه",
	"چهارشنبه",
	"پنج‌شنبه",
	"جمعه"
], x = [
	"فروردین",
	"اردیبهشت",
	"خرداد",
	"تیر",
	"مرداد",
	"شهریور",
	"مهر",
	"آبان",
	"آذر",
	"دی",
	"بهمن",
	"اسفند"
], S = ({ initialDate: e = _.today(), nextDaysLimit: s = !1, nextDaysLimitCallback: c = () => {}, format: l = (e) => e.toString(), onChange: u = () => {}, backgroundColor: d = "#Fff", buttonBackgroundColor: f = "#ddd", buttonSize: p = 15, ...m }) => {
	let [h, g] = n(e), [v, y] = n(!0), b = () => {
		if (s && h.isToday()) {
			c();
			return;
		}
		let e = h.nextDay();
		g(e);
	}, x = () => {
		let e = h.previousDay();
		g(e);
	};
	return t(() => {
		if (v) {
			y(!1);
			return;
		}
		u(h);
	}, [h]), /* @__PURE__ */ i("div", {
		className: "date-input",
		children: [/* @__PURE__ */ r("input", {
			type: "text",
			name: "date-input",
			value: l(h),
			readOnly: !0,
			onKeyDown: (e) => {
				switch (e.preventDefault(), e.key) {
					case "ArrowUp":
						b();
						break;
					case "ArrowDown": x();
				}
			},
			style: { backgroundColor: d },
			...m
		}), /* @__PURE__ */ i("div", {
			className: "date-input-buttons",
			children: [/* @__PURE__ */ r("button", {
				type: "button",
				onClick: b,
				style: { backgroundColor: f },
				children: /* @__PURE__ */ r(o, { size: p })
			}), /* @__PURE__ */ r("button", {
				type: "button",
				onClick: x,
				style: { backgroundColor: f },
				children: /* @__PURE__ */ r(a, { size: p })
			})]
		})]
	});
};
//#endregion
export { S as DateInput, g as Dialog, m as Toast, h as dialog, p as toast };
