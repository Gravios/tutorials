
STDIN equ 0
STDOUT equ 1
STDERR equ 2

SYS_READ equ 0
SYS_WRITE equ 1
SYS_EXIT equ 60

section .data
  text db "Hello, World!",10
  text2 db "World?",10,0

section .text
  global _start

%macro exit 0
  mov rax, SYS_EXIT
  mov rdi, 0
  syscall
%endmacro

%macro printString 1
  mov rax, %1
  call _print
%endmacro

_start:
  printString text
  printString text2
  exit

; input: rax as pointer to string
; output: print string at rax
_print:
  push rax
  mov rbx, 0
_printLoop:
  inc rax
  inc rbx
  mov cl, [rax]
  cmp cl, 0
  jne _printLoop

  mov rax, SYS_WRITE
  mov rdi, STDOUT
  pop rsi
  mov rdx, rbx
  syscall

