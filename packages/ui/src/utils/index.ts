import { clsx, type ClassValue } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

/**
 * Handles setting callback refs and MutableRefObjects.
 * @param ref The ref to use for the instance.
 * @param instance The instance being set.
 */
const setRef = <TInstance>(ref: React.Ref<TInstance>, instance: TInstance) => {
	if (ref instanceof Function) {
		ref(instance);
	} else if (ref != null) {
		(ref as React.MutableRefObject<TInstance>).current = instance;
	}
}

export const combinedRef = <TInstance>(refs: React.Ref<TInstance>[]) => {
	return (instance: TInstance | null) =>
		refs.forEach((ref) => setRef(ref, instance));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyProps = Record<string, any>;

export const mergeReactProps = (parentProps: AnyProps, childProps: AnyProps) => {
	// All child props should override.
	const overrideProps = {...childProps};

	for (const propName in childProps) {
		const parentPropValue = parentProps[propName];
		const childPropValue = childProps[propName];

		const isHandler = /^on[A-Z]/.test(propName);
		// If it's a handler, modify the override by composing the base handler.
		if (isHandler) {
			// Only compose the handlers if both exist.
			if (childPropValue && parentPropValue) {
				overrideProps[propName] = (...args: unknown[]) => {
					childPropValue?.(...args);
					parentPropValue?.(...args);
				};
				// Otherwise, avoid creating an unnecessary callback.
			} else if (parentPropValue) {
				overrideProps[propName] = parentPropValue;
			}
		} else if (propName === 'style') {
			overrideProps[propName] = {...parentPropValue, ...childPropValue};
		} else if (propName === 'className') {
			overrideProps[propName] = [parentPropValue, childPropValue]
				.filter(Boolean)
				.join(' ');
		}
	}

	return {...parentProps, ...overrideProps};
}
