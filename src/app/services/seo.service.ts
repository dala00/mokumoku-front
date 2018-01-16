import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';

@Injectable()
export class SeoService {
  private headElement: HTMLElement;
  private metaDescription: HTMLElement;
  private robots: HTMLElement;
  private DOM: any;
  private elements: Object;

  constructor(
    private titleService: Title
  ) {
    this.DOM = getDOM();
    this.headElement = this.DOM.query('head');
    this.elements = {};
    this.metaDescription = this.getOrCreateMetaElement('description');
    this.robots = this.getOrCreateMetaElement('robots');
  }

  public getTitle(): string {
    return this.titleService.getTitle();
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
    this.setMeta('og:title', newTitle);
  }

  public setMeta(name: string, content: string) {
    const el = this.getOrCreateMetaElement(name);
    el.setAttribute('content', content);
  }

  public getMeta(name: string) {
    const el = this.getOrCreateMetaElement(name);
    return el.getAttribute('content');
  }

  public getMetaRobots(): string {
    return this.robots.getAttribute('content');
  }

  public setMetaRobots(robots: string) {
    this.robots.setAttribute('content', robots);
  }

  private getOrCreateMetaElement(name: string): HTMLElement {
    if (this.elements[name]) {
      return this.elements[name];
    }

    let el: HTMLElement;
    el = this.DOM.query(`meta[name="${name}"]`);
    if (el === null) {
      el = this.DOM.createElement('meta');
      el.setAttribute('name', name);
      this.headElement.appendChild(el);
    }
    this.elements[name] = el;
    return el;
  }
}
