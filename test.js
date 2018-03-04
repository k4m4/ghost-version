import test from 'ava';
import m from './';

test('ghost hostname', async t => {
	t.is(await m('https://nikolaskama.me'), '1.19');
});

test('non-ghost hostname', async t => {
	t.is(await m('google.com'), 'Target doesn\'t seem to be using Ghost');
});

test('unreachable hostname', async t => {
	t.is(await m('34364533534123332049123125235623452344123.com'), 'Target doesn\'t seem to be using Ghost');
});

test('with timeout', async t => {
	t.is(await m('https://nikolaskama.me', {timeout: 3000}), '1.19');
});

test('with impossible timeout', async t => {
	t.is(await m('https://nikolaskama.me', {timeout: 1}), 'Something went wrong: TimeoutError: Promise timed out after 1 milliseconds');
});