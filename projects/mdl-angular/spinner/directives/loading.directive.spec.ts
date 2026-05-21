import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MdlLoadingDirective } from './loading.directive';

@Component({
  standalone: true,
  imports: [MdlLoadingDirective],
  template: `<div [mdlLoading]="loading" [mdlLoadingText]="text" [mdlLoadingBackdrop]="backdrop">content</div>`,
})
class TestHostComponent {
  loading: boolean | undefined = false;
  text?: string;
  backdrop: boolean | undefined = true;
}

describe('MdlLoadingDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [TestHostComponent] });
  });

  it('does not create a wrapper when mdlLoading=false', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const wrapper = fixture.nativeElement.querySelector('mdl-loading-wrapper');
    expect(wrapper).toBeNull();
  });

  it('creates a loading wrapper when mdlLoading=true', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.componentInstance.loading = true;
    fixture.detectChanges();
    const wrapper = fixture.nativeElement.querySelector('mdl-loading-wrapper');
    expect(wrapper).not.toBeNull();
  });

  it('destroys the wrapper when mdlLoading goes back to false', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.componentInstance.loading = true;
    fixture.detectChanges();
    fixture.componentInstance.loading = false;
    fixture.detectChanges();
    const wrapper = fixture.nativeElement.querySelector('mdl-loading-wrapper');
    expect(wrapper).toBeNull();
  });

  it('passes text to the wrapper', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.componentInstance.loading = true;
    fixture.componentInstance.text = 'Chargement…';
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('mdl-loading-wrapper span');
    expect(span?.textContent?.trim()).toBe('Chargement…');
  });

  it('adds backdrop class to wrapper by default', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.componentInstance.loading = true;
    fixture.detectChanges();
    const wrapper = fixture.nativeElement.querySelector('mdl-loading-wrapper');
    expect(wrapper?.classList).toContain('backdrop');
  });

  it('does not add backdrop class when mdlLoadingBackdrop=false', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.componentInstance.loading = true;
    fixture.componentInstance.backdrop = false;
    fixture.detectChanges();
    const wrapper = fixture.nativeElement.querySelector('mdl-loading-wrapper');
    expect(wrapper?.classList).not.toContain('backdrop');
  });

  it('sets host position to relative', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const host = fixture.nativeElement.querySelector('div');
    expect(host.style.position).toBe('relative');
  });
});
