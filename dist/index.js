import './index.css';
import { useCallback as e, useEffect as t, useState as n } from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { FaCheckCircle as a, FaTimesCircle as o } from "react-icons/fa";
import { IoWarningSharp as s } from "react-icons/io5";
import { TbMessageCircleFilled as c } from "react-icons/tb";
import { FaXmark as l } from "react-icons/fa6";
//#region toast/toast-item/ToastItem.jsx
var u = ({ toastData: a, removeToast: o }) => {
	let { id: s, title: c, message: l, icon: u, color: d } = a, [f, p] = n(!1), [m, h] = n(!1), g = e(() => {
		p(!1), h(!0), setTimeout(() => o(s), 200);
	}, [s, o]);
	return t(() => {
		p(!0);
		let e = setTimeout(g, 5e3);
		return () => {
			clearTimeout(e);
		};
	}, [g]), /* @__PURE__ */ i("div", {
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
}, d = new class {
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
			icon: /* @__PURE__ */ r(a, {}),
			color: "green"
		});
	}
	error(e, t) {
		this.#r({
			type: "error",
			title: e,
			message: t,
			icon: /* @__PURE__ */ r(o, {}),
			color: "red"
		});
	}
	warn(e, t) {
		this.#r({
			type: "warn",
			title: e,
			message: t,
			icon: /* @__PURE__ */ r(s, {}),
			color: "orange"
		});
	}
	info(e, t) {
		this.#r({
			type: "info",
			title: e,
			message: t,
			icon: /* @__PURE__ */ r(c, {}),
			color: "yellow"
		});
	}
}(), f = () => {
	let [e, i] = n([]);
	t(() => {
		d.setState(i);
	}, []);
	let a = (e) => {
		i((t) => t.filter((t) => t.id !== e));
	};
	return /* @__PURE__ */ r("div", {
		id: "toast-container",
		children: e.map((e) => /* @__PURE__ */ r(u, {
			toastData: e,
			removeToast: a
		}, e.id))
	});
}, p = new class {
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
}(), m = () => {
	let [e, a] = n(null), [o, s] = n(!1), [c, u] = n(!1);
	if (t(() => {
		p.setState(a);
	}, []), t(() => {
		e && (u(!1), requestAnimationFrame(() => {
			s(!0);
		}));
	}, [e]), !e) return null;
	let { title: d = "", messages: f = [], options: m = [{
		title: "OK",
		value: !0
	}, {
		title: "Cancel",
		value: !1
	}] } = e, h = (e) => {
		u(!0), s(!1), setTimeout(() => {
			p.resolve(e);
		}, 200);
	}, g = (e, t) => e.color ? e.color : m.length === 1 || t === 0 ? "#2563eb" : t === m.length - 1 ? "#dc2626" : "#6b7280";
	return /* @__PURE__ */ r("div", {
		className: "dialog-overlay",
		children: /* @__PURE__ */ i("div", {
			className: `dialog ${o && !c ? "visible" : ""}`,
			children: [
				/* @__PURE__ */ r("button", {
					className: "dialog-close",
					onClick: () => h(null),
					children: /* @__PURE__ */ r(l, {})
				}),
				/* @__PURE__ */ i("div", {
					className: "dialog-messages",
					children: [/* @__PURE__ */ r("div", {
						className: "dialog-title",
						children: d
					}), f.map((e, t) => /* @__PURE__ */ r("div", { children: e }, `message-${t}`))]
				}),
				/* @__PURE__ */ r("div", {
					className: "dialog-buttons",
					children: m.map((e, t) => /* @__PURE__ */ r("button", {
						onClick: () => h(e.value === void 0 ? null : e.value),
						style: { backgroundColor: g(e, t) },
						children: e.title
					}, e.value || t))
				})
			]
		})
	});
};
//#endregion
export { m as Dialog, f as Toast, p as dialog, d as toast };
